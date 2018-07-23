import { DynamoDB } from 'aws-sdk'
import { EventStore, GetByIdOptions } from './eventStore'
import { conflictError, notFoundError } from '../../model/errors'
import { validateEvents } from '../../model/eventSchema'
import { Event } from '../../model/eventTypes'

const region = process.env.EVENTSTORE_TABLE_REGION || 'eu-west-1'
const esTable = process.env.EVENTSTORE_TABLE

const dynamoClient = new DynamoDB.DocumentClient({ region })

export const dynamoDbEventStore: EventStore = {
  getById: (id: string, options: GetByIdOptions = {}) => {
    return dynamoClient
      .query({
        TableName: esTable,
        ConsistentRead: true,
        KeyConditionExpression: 'streamId = :a AND version >= :v',
        ExpressionAttributeValues: {
          ':a': id,
          ':v': options.version || 0
        }
      })
      .promise()
      .then(res => {
        if (res.Count === 0) {
          if (options.emptyArrOn404) {
            return []
          }
          throw notFoundError({
            id,
            options,
            message: 'resource not found'
          })
        }
        return flat(res.Items.map(item => JSON.parse(item.events)))
      })
  },

  getByTimestamp: (timestamp: number) => {
    return dynamoClient
      .query({
        TableName: esTable,
        IndexName: 'active-committedAt-index',
        KeyConditionExpression: 'active = :active and committedAt > :timestamp',
        ExpressionAttributeValues: {
          ':active': 1,
          ':timestamp': timestamp
        }
      })
      .promise()
      .then(res => {
        return flat(res.Items.map(item => JSON.parse(item.events)))
      })
  },

  save: (params: {
    events: Event[]
    streamId: string
    expectedVersion: number
  }) => {
    const timestamp = Date.now()
    const eventTimestamp =
      process.env.NODE_ENV === 'test' && global['testTimestamp']
        ? global['testTimestamp']
        : timestamp

    const eventsWithTimestamp = params.events
      .filter(e => e !== undefined)
      .map(e => ({
        ...e,
        timestamp: e.timestamp || eventTimestamp
      }))

    const error = validateEvents(eventsWithTimestamp)
    if (error) {
      return Promise.reject(error)
    }

    const commitId = timestamp + ':' + params.streamId
    return dynamoClient
      .put({
        TableName: esTable,
        Item: {
          commitId,
          committedAt: timestamp,
          streamId: params.streamId,
          version: params.expectedVersion,
          active: 1,
          events: JSON.stringify(eventsWithTimestamp)
        },
        ConditionExpression: 'attribute_not_exists(version)',
        ReturnValues: 'NONE'
      })
      .promise()
      .then(() => {
        return {
          id: params.streamId
        }
      })
      .catch(err => {
        if (err.name === 'ConditionalCheckFailedException') {
          throw conflictError({
            ...params,
            message: 'A commit already exists with the specified version'
          })
        }

        throw err
      })
  }
}

function flat(arr: any[]) {
  return arr.reduce((acc, val) => acc.concat(val), [])
}

export const getDynamoEventStoreSchema = tableName => ({
  TableName: tableName,
  AttributeDefinitions: [
    { AttributeName: 'active', AttributeType: 'N' },
    { AttributeName: 'committedAt', AttributeType: 'N' },
    { AttributeName: 'streamId', AttributeType: 'S' },
    { AttributeName: 'version', AttributeType: 'N' }
  ],
  KeySchema: [
    { AttributeName: 'streamId', KeyType: 'HASH' },
    { AttributeName: 'version', KeyType: 'RANGE' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'active-committedAt-index',
      KeySchema: [
        { AttributeName: 'active', KeyType: 'HASH' },
        { AttributeName: 'committedAt', KeyType: 'RANGE' }
      ],
      Projection: { ProjectionType: 'ALL' },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ]
})

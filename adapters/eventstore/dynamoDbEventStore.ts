import { DynamoDB } from 'aws-sdk'
import { EventStore } from './types'
import { Event } from '../../model/types'
import { conflictError, notFoundError } from '../../model/errors'
import { validateEvents } from '../../model/eventSchema'

const region = process.env.EVENTSTORE_TABLE_REGION || 'eu-west-1'
const eventStoreTable = process.env.EVENTSTORE_TABLE || 'eventstore'

const dynamoClient = new DynamoDB.DocumentClient({ region })

export const dynamoDbEventStore: EventStore = {
  getById: (id: string, version = 0) => {
    return dynamoClient
      .query({
        TableName: eventStoreTable,
        ConsistentRead: true,
        KeyConditionExpression: 'streamId = :a AND version >= :v',
        ExpressionAttributeValues: {
          ':a': id,
          ':v': version
        }
      })
      .promise()
      .then(res => {
        if (res.Count === 0) {
          throw notFoundError({
            id,
            version,
            message: 'resoure not found'
          })
        }
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

    const eventsWithTimestamp = params.events.map(e => ({
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
        TableName: eventStoreTable,
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

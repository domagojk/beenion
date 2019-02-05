import { DynamoDB } from 'aws-sdk'
import { EventStore, GetByIdOptions } from './eventStore'
import { validateEvents } from './eventSchema'
import { Event } from '../../../model/eventTypes'
import { getSyncTime } from './getSyncTime'

const region = process.env.REGION || 'us-east-1'
const esTable = process.env.EVENTSTORE_TABLE || 'eventstore'
const SNAPSHOT_TABLE = 'getbyid-snapshots'
const MAX_EVENTS_UNTIL_SAVED = 10

const dynamoClient = new DynamoDB.DocumentClient({ region })

const emptyQueryRes = {
  Items: [],
  Count: 0,
  ScannedCount: 0
}

export const dynamoDbEventStore: EventStore = {
  getById: (id: string, options: GetByIdOptions = {}) => {
    if (!id) {
      throw new Error(`undefined "id" param in getById()`)
    }
    return queryRecursive(dynamoClient)({
      TableName: esTable,
      ConsistentRead: true,
      KeyConditionExpression: 'streamId = :a AND version >= :v',
      ExpressionAttributeValues: {
        ':a': id,
        ':v': options.version || 0
      }
    }).then(res => {
      if (res.Count === 0) {
        if (options.returnEmptyArrOn404) {
          return []
        }
        const notFoundError = new Error('resource not found')
        notFoundError['statusCode'] = 404
        throw notFoundError
      }
      return flat(res.Items.map(item => JSON.parse(item.events)))
    })
  },

  getByIdUsingSnapshot: ({ id, reducerId, reducerVersion, reducer }) => {
    return dynamoClient
      .query({
        TableName: SNAPSHOT_TABLE,
        KeyConditionExpression:
          'streamId = :streamId AND begins_with(snapshotId, :snapshotId)',
        ExpressionAttributeValues: {
          ':streamId': id,
          ':snapshotId': `${reducerId}:${reducerVersion}`
        }
      })
      .promise()
      .then(res => {
        if (res.Count === 1) {
          return {
            state: JSON.parse(res.Items[0].state),
            version: res.Items[0].version
          }
        }
        return {
          version: 0
        }
      })
      .then(snapshotState => {
        return dynamoDbEventStore
          .getById(id, {
            returnEmptyArrOn404: true,
            version: snapshotState.version ? snapshotState.version : undefined
          })
          .then(events => {
            return {
              state: reducer(events, snapshotState.state),
              version: snapshotState.version + events.length
            }
          })
          .then(currentState => {
            if (
              currentState.version - snapshotState.version >
              MAX_EVENTS_UNTIL_SAVED
            ) {
              // should update snapshot
              return dynamoClient
                .put({
                  TableName: SNAPSHOT_TABLE,
                  Item: {
                    streamId: id,
                    snapshotId: `${reducerId}:${reducerVersion}`,
                    version: currentState.version,
                    state: JSON.stringify(currentState.state)
                  },
                  ReturnValues: 'NONE'
                })
                .promise()
                .then(() => currentState)
            }
            // no need to update snapshot
            return currentState
          })
      })
  },

  getByIdAndVersion: (
    id: string,
    version: number,
    consistentRead = true
  ): Promise<Event[]> => {
    return queryRecursive(dynamoClient)({
      TableName: esTable,
      ConsistentRead: consistentRead,
      KeyConditionExpression: 'streamId = :a AND version = :v',
      ExpressionAttributeValues: {
        ':a': id,
        ':v': version
      }
    }).then(res => {
      if (res.Count === 0) {
        const notFoundError = new Error('resource not found')
        notFoundError['statusCode'] = 404
        throw notFoundError
      }
      return flat(
        res.Items.map(item =>
          JSON.parse(item.events).map(e => {
            return {
              ...e,
              committedAt: item.committedAt
            }
          })
        )
      )
    })
  },

  getByTimestamp: (timestamp: number) => {
    let shouldContinueFrom = null
    return dynamoClient
      .query({
        TableName: esTable,
        IndexName: 'active-committedAt-index',
        KeyConditionExpression:
          'active = :active and committedAt >= :timestamp',
        ExpressionAttributeValues: {
          ':active': 1, // using fixed partition like this is an anti-pattern which will be replaced
          ':timestamp': timestamp
        }
      })
      .promise()
      .then(res => {
        if (res.LastEvaluatedKey) {
          const lastTimestamp = res.Items[res.Items.length - 1].committedAt
          shouldContinueFrom = lastTimestamp + 1 // excluding last one
        }
        return res.Items
      })
      .then(items => {
        let index = -1
        let staged = []
        return {
          getEvent: () => {
            if (staged.length) {
              return staged.shift()
            }
            index++
            if (!items[index]) {
              if (shouldContinueFrom) {
                return dynamoDbEventStore.getByTimestamp(shouldContinueFrom)
              }
              return null
            }
            return dynamoDbEventStore
              .getByIdAndVersion(
                items[index].streamId,
                items[index].version,
                false
              )
              .then(events => {
                staged = events
                return staged.shift()
              })
          }
        }
      })
  },

  save: (params: {
    events: Event[]
    streamId: string
    expectedVersion: number
  }) => {
    return getSyncTime().then(syncTime => {
      const eventTimestamp =
        process.env.NODE_ENV === 'test' && global['testTimestamp']
          ? global['testTimestamp']
          : syncTime

      const eventsWithTimestamp = params.events
        .filter(e => !!e)
        .map(e => ({
          ...e,
          timestamp: e.timestamp || eventTimestamp
        }))

      const error = validateEvents(eventsWithTimestamp)
      if (error) {
        console.log(JSON.stringify(eventsWithTimestamp))
        return Promise.reject(error)
      }

      return dynamoClient
        .put({
          TableName: esTable,
          Item: {
            commitId: syncTime + ':' + params.streamId,
            committedAt: syncTime,
            streamId: params.streamId,
            version: params.expectedVersion,
            active: 1, // using fixed partition like this is an anti-pattern which will be replaced
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
            const conflictError = new Error('A commit already exists with the specified version')
            conflictError['statusCode'] = 409
          }

          throw err
        })
    })
  }
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

function flat(arr: any[]) {
  return arr.reduce((acc, val) => acc.concat(val), [])
}

const queryRecursive = dynamoClient => (
  params,
  allResults = emptyQueryRes
): Promise<any> =>
  dynamoClient
    .query(params)
    .promise()
    .then(res => {
      allResults = {
        ...allResults,
        Items: [...allResults.Items, ...res.Items],
        Count: allResults.Count + res.Count,
        ScannedCount: allResults.ScannedCount + res.ScannedCount
      }
      if (res.LastEvaluatedKey) {
        return queryRecursive(dynamoClient)(
          {
            ...params,
            ExclusiveStartKey: res.LastEvaluatedKey
          },
          allResults
        )
      }
      return allResults
    })
    .then(res => {
      return res as any
    })

/*
* each event handler has its "row" in dynamodb under key eventHandlerId.
* For that eventHandlerId, handler writes down version of the last handled event.
* When handler is triggered, it queries all events from that version and
* performs side-effects (triggering 3rd party service or writing to a db)
*/
import { DynamoDB } from 'aws-sdk'
import { dynamoDbEventStore } from './dynamoDbEventStore'
import { publishEventCreatedToSNS } from './publishEventCreatedToSNS'
import { Event } from '../../../model/eventTypes'

const EVENT_HANDLER_STATUS_TABLE =
  process.env.EVENT_HANDLER_STATUS_TABLE || 'projection_status'
const EVENT_HANDLER_STATUS_REGION =
  process.env.EVENT_HANDLER_STATUS_REGION || 'us-east-1'

const dynamoClient = new DynamoDB.DocumentClient({
  region: EVENT_HANDLER_STATUS_REGION
})

export async function invokeEventHandler(
  eventHandlerId: string,
  eventHandler: (events: Event[]) => Promise<any>
) {
  const evHandlerStatus = await getEventHandlerStatus(eventHandlerId)

  if (evHandlerStatus.inProgress) {
    throw new Error('event handler execution in progress')
  }

  // lock event handler status row (so it performs side effects one at a time)
  await saveWithOptimisticLock(
    {
      projectionId: eventHandlerId,
      timestamp: evHandlerStatus.timestamp,
      inProgress: true
    },
    evHandlerStatus.version
  )

  try {
    // get events from timestamp and invoke handler
    const events = await dynamoDbEventStore.getByTimestamp(
      evHandlerStatus.timestamp
    )
    const eventsSliced = events.slice(0, 10)
    await eventHandler(eventsSliced)

    // save new version in event handler status
    await saveWithOptimisticLock(
      {
        projectionId: eventHandlerId,
        timestamp: events.length
          ? eventsSliced[eventsSliced.length - 1].timestamp
          : evHandlerStatus.timestamp,
        inProgress: false
      },
      evHandlerStatus.version + 1
    )

    if (eventsSliced.length !== events.length) {
      // starting process once again until all events are handled
      publishEventCreatedToSNS(err => {
        if (err) {
          throw err
        }
      })
    }
  } catch (err) {
    // if something went wrong, reset dynamodb status to initial values
    await saveWithoutOptimisticLock({
      projectionId: eventHandlerId,
      timestamp: evHandlerStatus.timestamp,
      version: evHandlerStatus.version,
      inProgress: evHandlerStatus.inProgress
    })

    throw err
  }
}

function getEventHandlerStatus(eventHandlerId) {
  return dynamoClient
    .get({
      TableName: EVENT_HANDLER_STATUS_TABLE,
      Key: {
        projectionId: eventHandlerId
      }
    })
    .promise()
    .then(res => {
      if (!res.Item) {
        const newEventHandler = {
          projectionId: eventHandlerId,
          timestamp: 0,
          version: 0,
          inProgress: false
        }

        return dynamoClient
          .put({
            TableName: EVENT_HANDLER_STATUS_TABLE,
            Item: newEventHandler
          })
          .promise()
          .then(() => newEventHandler)
      }

      return res.Item
    })
    .then(res => ({
      timestamp: res.timestamp || 0,
      inProgress: res.inProgress !== undefined ? res.inProgress : false,
      version: res.version || 0
    }))
}

function saveWithOptimisticLock(Item, expectedVersion: number) {
  return dynamoClient
    .put({
      TableName: EVENT_HANDLER_STATUS_TABLE,
      Item: {
        ...Item,
        version: expectedVersion + 1
      },
      ConditionExpression: '#version = :expectedVersion',
      ExpressionAttributeNames: {
        '#version': 'version'
      },
      ExpressionAttributeValues: {
        ':expectedVersion': expectedVersion
      }
    })
    .promise()
}

function saveWithoutOptimisticLock(Item) {
  return dynamoClient
    .put({
      TableName: EVENT_HANDLER_STATUS_TABLE,
      Item: {
        ...Item
      }
    })
    .promise()
}

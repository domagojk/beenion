import * as stream from 'getstream'
import { dynamoDbEventStore as eventStore } from '../adapters/eventstore/aws/dynamoDbEventStore'
import { Event } from '../model/eventTypes'
import { linkProjection } from '../model/projections/linkProjection';

export function getStreamRateLinkEventHandler(events: Event[]) {
  const getStreamClient = stream.connect(
    process.env.GETSTREAM_KEY,
    process.env.GETSTREAM_SECRET,
    process.env.GETSTREAM_APPID
  )

  return Promise.all(
    events
      .map(async e => {
        if (e.type !== 'LINK_RATED') {
          return null
        }

        const userFeed = getStreamClient.feed('user', e.payload.userId)

        const events = await eventStore.getById(e.payload.linkId, {
          emptyArrOn404: true
        })
        const link = linkProjection(events)
        const isUpdated = events.filter(e => e.type === 'LINK_RATED').length > 1

        if (!isUpdated) {
          return userFeed.addActivity({
            actor: e.payload.userId,
            verb: 'linkRating',
            foreign_id: e.payload.linkId,
            time: new Date(e.timestamp).toISOString(),
            object: {
              ...link,
              linkId: e.payload.linkId,
              userId: e.payload.userId
            }
          })
        }

        // if link is updated use initial timestamp
        let firstTimestamp
        for (const e of events) {
          if (e.type === 'LINK_RATED') {
            firstTimestamp = e.timestamp
            break
          }
        }

        return new Promise((resolve, reject) => {
          getStreamClient.updateActivities(
            [
              {
                actor: e.payload.userId,
                verb: 'linkRating',
                foreign_id: e.payload.linkId,
                time: new Date(firstTimestamp).toISOString(),
                object: {
                  ...link,
                  linkId: e.payload.linkId,
                  userId: e.payload.userId
                }
              }
            ],
            () => {
              resolve()
            }
          )
        })
      })
      .filter(res => res !== null)
  )
}

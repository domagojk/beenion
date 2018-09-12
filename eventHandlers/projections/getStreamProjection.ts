import * as stream from 'getstream'
import { Event } from '../../model/eventTypes'
import { dynamoDbEventStore } from '../../databases/eventstore/dynamoDbEventStore'
import { linkReducer } from '../../model/reducers/linkReducer'

const getStreamClient = stream.connect(
  process.env.GETSTREAM_KEY,
  process.env.GETSTREAM_SECRET,
  process.env.GETSTREAM_APPID
)

export async function getStreamProjection(e: Event): Promise<any> {
  if (e.type === 'USER_FOLLOWED') {
    const userFeed = getStreamClient.feed('timeline', e.payload.userId)
    return userFeed.follow('user', e.payload.followedUserId)
  }

  if (e.type === 'USER_UNFOLLOWED') {
    const userFeed = getStreamClient.feed('timeline', e.payload.userId)
    return userFeed.unfollow('user', e.payload.unfollowedUserId)
  }

  if (e.type === 'LINK_RATED') {
    const userFeed = getStreamClient.feed('user', e.payload.userId)

    const events = await dynamoDbEventStore.getById(e.payload.linkId, {
      returnEmptyArrOn404: true
    })
    const link = linkReducer(events)
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
    for (const event of events) {
      if (event.type === 'LINK_RATED') {
        firstTimestamp = event.timestamp
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
  }

  return Promise.resolve()
}

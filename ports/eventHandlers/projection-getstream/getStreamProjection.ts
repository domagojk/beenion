import * as stream from 'getstream'
import { Event } from '../../../model/eventTypes'
import { dynamoDbEventStore } from '../../../infrastructure/databases/eventstore/dynamoDbEventStore'
import { linkReducer } from '../../../model/link/reducers/linkReducer'
import md5 from 'md5'

const getStreamClient = stream.connect(
  process.env.GETSTREAM_KEY,
  process.env.GETSTREAM_SECRET,
  process.env.GETSTREAM_APPID
)

export async function getStreamProjection(e: Event): Promise<any> {
  switch (e.type) {
    case 'USER_FOLLOWED': {
      const userFeed = getStreamClient.feed('timeline', md5(e.payload.userId))
      return userFeed.follow('user', md5(e.payload.followedUserId))
    }
    case 'USER_UNFOLLOWED': {
      const userFeed = getStreamClient.feed('timeline', md5(e.payload.userId))
      return userFeed.unfollow('user', md5(e.payload.unfollowedUserId))
    }
    case 'LINK_RATED': {
      const userFeed = getStreamClient.feed('user', md5(e.payload.userId))

      const events = await dynamoDbEventStore.getById(e.payload.linkId, {
        returnEmptyArrOn404: true
      })
      const link = linkReducer(events)
      const isUpdated = events.filter(e => e.type === 'LINK_RATED').length > 1

      if (!isUpdated) {
        return userFeed.addActivity({
          actor: md5(e.payload.userId),
          verb: 'linkRating',
          foreign_id: e.payload.linkId,
          time: new Date(e.timestamp).toISOString(),
          to: link.tags.map(tag => `tag:${tag}`),
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
              actor: md5(e.payload.userId),
              verb: 'linkRating',
              foreign_id: e.payload.linkId,
              time: new Date(firstTimestamp).toISOString(),
              to: link.tags.map(tag => `tag:${tag}`),
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
    default: {
      return Promise.resolve()
    }
  }
}

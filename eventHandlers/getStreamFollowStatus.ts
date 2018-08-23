import * as stream from 'getstream'
import { Event } from '../model/eventTypes'

export function getStreamfollowEventHandler(events: Event[]) {
  const getStreamClient = stream.connect(
    process.env.GETSTREAM_KEY,
    process.env.GETSTREAM_SECRET,
    process.env.GETSTREAM_APPID
  )

  const filtered = events.filter(
    e => e.type === 'USER_FOLLOWED' || e.type === 'USER_UNFOLLOWED'
  )

  return Promise.all(
    filtered.map(e => {
      const userFeed = getStreamClient.feed('timeline', e.payload.userId)
      if (e.type === 'USER_FOLLOWED') {
        return userFeed.follow('user', e.payload.followedUserId)
      }
      if (e.type === 'USER_UNFOLLOWED') {
        return userFeed.unfollow('user', e.payload.unfollowedUserId)
      }
    })
  )
}

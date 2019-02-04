import { Event } from '../../eventTypes'

export type UserFollowing = Record<string, boolean>

export function userFollowingReducer(
  events: Event[],
  initialState = {}
): UserFollowing {
  return events.reduce((acc, e: Event) => {
    switch (e.type) {
      case 'USER_FOLLOWED':
        return {
          ...acc,
          [e.payload.followedUserId]: true
        }
      case 'USER_UNFOLLOWED':
        return {
          ...acc,
          [e.payload.unfollowedUserId]: false
        }
      default:
        return acc
    }
  }, initialState)
}

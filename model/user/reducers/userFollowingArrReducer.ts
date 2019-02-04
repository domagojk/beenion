import { Event } from '../../eventTypes'

export function getUserFollowers(events: Event[], initialState = []): string[] {
  return events.reduce((followers: string[], e: Event) => {
    switch (e.type) {
      case 'USER_FOLLOWED':
        return [...followers, e.payload.followedUserId]
      case 'USER_UNFOLLOWED':
        return followers.filter(userId => userId !== e.payload.unfollowedUserId)
      default:
        return followers
    }
  }, initialState)
}

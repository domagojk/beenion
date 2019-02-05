import { DomainError } from '../../DomainError'
import { Event } from '../../eventTypes'
import { UserFollowing } from '../reducers/userFollowingReducer'

type Params = {
  userFollowers: UserFollowing
  unfollowedUserId: string
  userId: string
}

export function unfollow({
  userFollowers,
  unfollowedUserId,
  userId
}: Params): Event[] {
  if (!userFollowers[unfollowedUserId]) {
    throw new DomainError('user already unfollowed')
  }

  return [
    {
      type: 'USER_UNFOLLOWED',
      payload: {
        userId,
        unfollowedUserId
      }
    }
  ]
}

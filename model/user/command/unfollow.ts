import { validationError } from '../../errors'
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
    throw validationError('user already unfollowed')
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

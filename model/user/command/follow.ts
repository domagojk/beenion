import { validationError } from '../../errors'
import { Event } from '../../eventTypes'
import { UserFollowing } from '../reducers/userFollowingReducer'

type Params = {
  userFollowers: UserFollowing
  followUserId: string
  userId: string
}

export function follow({
  userFollowers,
  followUserId,
  userId
}: Params): Event[] {
  if (userFollowers[followUserId]) {
    throw validationError('user already followed')
  }

  return [
    {
      type: 'USER_FOLLOWED',
      payload: {
        userId,
        followedUserId: followUserId
      }
    }
  ]
}

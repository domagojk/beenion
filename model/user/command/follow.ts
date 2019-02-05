import { DomainError } from '../../DomainError'
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
    throw new DomainError('user already followed')
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

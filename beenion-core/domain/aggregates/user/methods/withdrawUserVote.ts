import { UserEvent, User, Timestamp } from '../../../types'
import errors from '../../../errors'

export function withdrawUserVote (params: {
  voter: User
  user: User
  timestamp: Timestamp
}): UserEvent[] {
  const { voter, user, timestamp } = params

  if (
    user.rankEvents.filter(
      rankEvent =>
        rankEvent.category === 'UserEvents' &&
        rankEvent.voterId === voter.userId
    ).length === 0
  ) {
    throw errors.userNotRated()
  }

  return [
    {
      type: 'UserVoteWithdrawn',
      voterId: voter.userId,
      userId: user.userId,
      timestamp
    }
  ]
}

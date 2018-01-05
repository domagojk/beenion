import { UserEvent, User, Timestamp } from '../../types'
import errors from '../../errors'

export function withdrawUserVote (
  voter: User,
  user: User,
  timestamp: Timestamp
): UserEvent[] {

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
      payload: {
        voterId: voter.userId,
        userId: user.userId,
        timestamp
      }
    }
  ]
}

import { UserEvent } from 'domain/types/events'
import { canWithdrawUserVote } from 'domain/businessRules'
import { USER_VOTE_WITHDRAWAL_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createTimestamp
} from 'domain/typeFactories'

function withdrawUserVote (command: {
  voterHistory: object[]
  userHistory: object[]
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const userHistory = createUserHistory(command.userHistory)
  const timestamp = createTimestamp(command.timestamp)

  const voter = reduceToUser(voterHistory)
  const user = reduceToUser(userHistory)

  if (!canWithdrawUserVote(voter, user)) {
    throw new Error(USER_VOTE_WITHDRAWAL_NOT_ALLOWED)
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

export default withdrawUserVote

import { UserEvent } from 'domain/types/events'
import { canWithdrawProjectVote } from 'domain/businessRules'
import { PROJECT_VOTE_WITHDRAWAL_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createProjectId,
  createPublicationId,
  createTimestamp
} from 'domain/typeFactories'

function withdrawProjectVote (command: {
  voterHistory: object[]
  userHistory: object[]
  userId: string
  projectId: string
  publicationId: string
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const userHistory = createUserHistory(command.userHistory)
  const projectId = createProjectId(command.projectId)
  const publicationId = createPublicationId(command.publicationId)
  const timestamp = createTimestamp(command.timestamp)

  const voter = reduceToUser(voterHistory)
  const user = reduceToUser(userHistory)

  if (!canWithdrawProjectVote(voter, user, projectId)) {
    throw new Error(PROJECT_VOTE_WITHDRAWAL_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectVoteWithdrawn',
      voterId: voter.userId,
      userId: user.userId,
      projectId,
      publicationId,
      timestamp
    }
  ]
}

export default withdrawProjectVote

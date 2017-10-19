import { UserEvent } from 'domain/types/events'
import { canWithdrawReviewVote } from 'domain/businessRules'
import { REVIEW_VOTE_WITHDRAWAL_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createArticleId,
  createJornalId,
  createTimestamp
} from 'domain/typeFactories'

function withdrawReviewVote (command: {
  voterHistory: object[]
  userHistory: object[]
  userId: string
  articleId: string
  journalId: string
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const userHistory = createUserHistory(command.userHistory)
  const articleId = createArticleId(command.articleId)
  const journalId = createJornalId(command.journalId)
  const timestamp = createTimestamp(command.timestamp)

  const voter = reduceToUser(voterHistory)
  const user = reduceToUser(userHistory)

  if (!canWithdrawReviewVote(voter, user, articleId)) {
    throw new Error(REVIEW_VOTE_WITHDRAWAL_NOT_ALLOWED)
  }

  return [
    {
      type: 'ReviewVoteWithdrawn',
      voterId: voter.userId,
      userId: user.userId,
      articleId,
      journalId,
      timestamp
    }
  ]
}

export default withdrawReviewVote

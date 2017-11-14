import { UserEvent, User, ArticleId, JournalId, Timestamp } from '../../../types'
import errors from '../../errors'

export function withdrawReviewVote (params: {
  voter: User
  reviewOwner: User
  articleId: ArticleId
  journalId: JournalId
  timestamp: Timestamp
}): UserEvent[] {
  const { voter, reviewOwner, articleId, journalId, timestamp } = params

  if (
    reviewOwner.rankEvents.filter(
      rankEvent =>
        rankEvent.category === 'ReviewVotes' &&
        rankEvent.articleId === articleId &&
        rankEvent.voterId === voter.userId
    ).length === 0
  ) {
    throw errors.reviewNotRated()
  }

  return [
    {
      type: 'ReviewVoteWithdrawn',
      voterId: voter.userId,
      reviewOwnerId: reviewOwner.userId,
      articleId,
      journalId,
      timestamp
    }
  ]
}

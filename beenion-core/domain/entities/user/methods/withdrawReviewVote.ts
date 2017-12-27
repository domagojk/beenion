import { UserEvent, User, ArticleId, newsletterId, Timestamp } from '../../../types'
import errors from '../../../errors'

export function withdrawReviewVote (params: {
  voter: User
  reviewOwner: User
  articleId: ArticleId
  newsletterId: newsletterId
  timestamp: Timestamp
}): UserEvent[] {
  const { voter, reviewOwner, articleId, newsletterId, timestamp } = params

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
      payload: {
        voterId: voter.userId,
        reviewOwnerId: reviewOwner.userId,
        articleId,
        newsletterId,
        timestamp
      }
    }
  ]
}

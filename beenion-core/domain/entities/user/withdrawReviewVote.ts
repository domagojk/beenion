import { UserEvent, User, ArticleId, NewsletterId, Timestamp } from '../../types'
import errors from '../../errors'

export function withdrawReviewVote (
  voter: User,
  reviewOwner: User,
  articleId: ArticleId,
  newsletterId: NewsletterId,
  timestamp: Timestamp
): UserEvent[] {

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

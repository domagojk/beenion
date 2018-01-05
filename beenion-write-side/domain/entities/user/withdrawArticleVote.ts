import { UserEvent, User, ArticleId, NewsletterId, Timestamp } from '../../types'
import errors from '../../errors'

export function withdrawArticleVote (
  voter: User,
  articleOwner: User,
  articleId: ArticleId,
  newsletterId: NewsletterId,
  timestamp: Timestamp
): UserEvent[] {

  if (
    articleOwner.rankEvents.filter(
      rankEvent =>
        rankEvent.category === 'ArticleVotes' &&
        rankEvent.articleId === articleId &&
        rankEvent.voterId === voter.userId
    ).length === 0
  ) {
    throw errors.articleNotRated()
  }

  return [
    {
      type: 'ArticleVoteWithdrawn',
      payload: {
        voterId: voter.userId,
        articleOwnerId: articleOwner.userId,
        articleId,
        newsletterId,
        timestamp
      }
    }
  ]
}

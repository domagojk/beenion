import { UserEvent, User, ArticleId, JournalId, Timestamp } from '../../../types'
import errors from '../../../errors'

export function withdrawArticleVote (params: {
  voter: User
  articleOwner: User
  articleId: ArticleId
  journalId: JournalId
  timestamp: Timestamp
}): UserEvent[] {
  const { voter, articleOwner, articleId, journalId, timestamp } = params

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
      voterId: voter.userId,
      articleOwnerId: articleOwner.userId,
      articleId,
      journalId,
      timestamp
    }
  ]
}

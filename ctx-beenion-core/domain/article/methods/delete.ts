import { ArticleEvent, User, Journal, Article, Timestamp } from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function del (params: {
  user: User
  journal: Journal
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { journal, user, article, timestamp } = params

  if (
    article.ownerId !== user.userId &&
    !privileges.canDeleteArticle(user, journal)
  ) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleDeleted',
      articleId: article.articleId,
      userId: user.userId,
      timestamp
    }
  ]
}

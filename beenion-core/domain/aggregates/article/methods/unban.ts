import { ArticleEvent, User, Journal, Article, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function unban (params: {
  user: User
  journal: Journal
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { journal, user, article, timestamp } = params

  if (article.banned) {
    throw errors.articleAlreadyBanned()
  }

  if (privileges.canBanArticle(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleUnbanned',
      articleId: article.articleId,
      userId: user.userId,
      timestamp
    }
  ]
}

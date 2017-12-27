import { ArticleEvent, User, Newsletter, Article, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function unban (params: {
  user: User
  newsletter: Newsletter
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { newsletter, user, article, timestamp } = params

  if (article.banned) {
    throw errors.articleAlreadyBanned()
  }

  if (privileges.canBanArticle(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleUnbanned',
      payload: {
        articleId: article.articleId,
        userId: user.userId,
        timestamp
      }
    }
  ]
}

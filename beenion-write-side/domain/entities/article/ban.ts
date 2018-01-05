import { ArticleEvent, User, Newsletter, Article, Timestamp } from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function banArticle (
  user: User,
  newsletter: Newsletter,
  article: Article,
  timestamp: Timestamp
): ArticleEvent[] {

  if (article.banned) {
    throw errors.articleAlreadyBanned()
  }

  if (!privileges.canBanArticle(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleBanned',
      payload: {
        articleId: article.articleId,
        userId: user.userId,
        timestamp
      }
    }
  ]
}

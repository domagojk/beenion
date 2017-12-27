import { ArticleEvent, User, Newsletter, Article, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function rejectApproved (params: {
  user: User
  newsletter: Newsletter
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { newsletter, user, article, timestamp } = params

  if (article.approved === false) {
    throw errors.articleNotApproved()
  }

  if (!privileges.canRejectApprovedArticle(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleRejected',
      payload: {
        articleId: article.articleId,
        timestamp
      }
    }
  ]
}

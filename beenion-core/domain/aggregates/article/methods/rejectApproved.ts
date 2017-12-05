import { ArticleEvent, User, Journal, Article, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function rejectApproved (params: {
  user: User
  journal: Journal
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { journal, user, article, timestamp } = params

  if (article.approved === false) {
    throw errors.articleNotApproved()
  }

  if (!privileges.canRejectApprovedArticle(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleRejected',
      articleId: article.articleId,
      timestamp
    }
  ]
}

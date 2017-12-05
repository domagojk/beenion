import { ArticleEvent, User, Journal, Article, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function resubmit (params: {
  user: User
  journal: Journal
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { user, journal, article, timestamp } = params

  if (article.banned) {
    throw errors.articleAlreadyBanned()
  }

  if (article.approved) {
    throw errors.articleAlreadyApproved()
  }

  if (article.reviewProcessCompleted) {
    throw errors.reviewProcessAlreadyCompleted()
  }

  if (article.ownerId !== user.userId) {
    throw errors.userIsNotOwner()
  }

  if (!privileges.canResubmitArticle(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleResubmitted',
      articleId: article.articleId,
      timestamp
    }
  ]
}

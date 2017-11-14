import { ArticleEvent, UserId, Article, Timestamp } from '../../../types'
import errors from '../../errors'

export function removeReviewer (params: {
  reviewerId: UserId,
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { reviewerId, article, timestamp } = params

  if (!article.reviewers.includes(reviewerId)) {
    throw errors.reviewerNotListed()
  }

  return [
    {
      type: 'ArticleReviewerRemoved',
      articleId: article.articleId,
      reviewerId,
      timestamp
    }
  ]
}

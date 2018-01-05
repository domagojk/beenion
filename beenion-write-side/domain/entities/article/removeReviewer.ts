import { ArticleEvent, UserId, Article, Timestamp } from '../../types'
import errors from '../../errors'

export function removeArticleReviewer (
  reviewerId: UserId,
  article: Article,
  timestamp: Timestamp
): ArticleEvent[] {

  if (!article.reviewers.includes(reviewerId)) {
    throw errors.reviewerNotListed()
  }

  return [
    {
      type: 'ArticleReviewerRemoved',
      payload: {
        articleId: article.articleId,
        reviewerId,
        timestamp
      }
    }
  ]
}

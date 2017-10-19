import { ArticleEvent } from 'domain/types/events'
import { canRemoveReviewer } from 'domain/businessRules'
import { ARTICLE_REMOVE_REVIEWER_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToArticle from 'domain/reduceToArticle'
import {
  createUserId,
  createArticleHistory,
  createTimestamp
} from 'domain/typeFactories'

function removeArticleReviewer (command: {
  reviewerId: string,
  articleHistory: object[]
  timestamp: number
}): ArticleEvent[] {

  const reviewerId = createUserId(command.reviewerId)
  const articleHistory = createArticleHistory(command.articleHistory)
  const timestamp = createTimestamp(command.timestamp)

  const article = reduceToArticle(articleHistory)

  if (canRemoveReviewer(reviewerId, article)) {
    throw new Error(ARTICLE_REMOVE_REVIEWER_NOT_ALLOWED)
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

export default removeArticleReviewer

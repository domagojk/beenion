import { ArticleEvent } from 'domain/types/events'
import * as rules from 'domain/businessRules'
import { ARTICLE_REVIEW_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToArticle from 'domain/reduceToArticle'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createEvaluation,
  createArticleHistory,
  createTimestamp
} from 'domain/typeFactories'

function reviewArticle (command: {
  reviewerHistory: object[]
  articleHistory: object[]
  evaluation: string
  timestamp: number
}): ArticleEvent[] {

  const reviewerHistory = createUserHistory(command.reviewerHistory)
  const articleHistory = createArticleHistory(command.articleHistory)
  const evaluation = createEvaluation(command.evaluation)
  const timestamp = createTimestamp(command.timestamp)

  const reviewer = reduceToUser(reviewerHistory)
  const article = reduceToArticle(articleHistory)

  if (!rules.canReviewArticle(reviewer, article)) {
    throw new Error(ARTICLE_REVIEW_NOT_ALLOWED)
  }

  const articleReviewed: ArticleEvent = {
    type: 'ArticleReviewed',
    articleId: article.articleId,
    reviewerId: reviewer.userId,
    evaluation,
    timestamp
  }
  const articlePromoted: ArticleEvent = {
    type: 'ArticlePromoted',
    userId: reviewer.userId,
    articleId: article.articleId,
    timestamp
  }
  const articleApproved: ArticleEvent = {
    type: 'ArticleApproved',
    userId: reviewer.userId,
    articleId: article.articleId,
    timestamp
  }
  const articleRejected: ArticleEvent = {
    type: 'ArticleRejected',
    userId: reviewer.userId,
    articleId: article.articleId,
    timestamp
  }

  const reviewedArticle = reduceToArticle([articleReviewed], article)

  if (rules.canApproveArticle(reviewedArticle)) {
    return [articleReviewed, articleApproved]
  }
  if (rules.canRejectArticle(reviewedArticle)) {
    return [articleReviewed, articleRejected]
  }
  if (rules.canPromoteArticle(reviewedArticle)) {
    return [articleReviewed, articlePromoted]
  }

  return [articleReviewed]
}

export default reviewArticle

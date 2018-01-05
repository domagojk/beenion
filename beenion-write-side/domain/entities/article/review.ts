import * as t from '../../types'
import reduceToArticle from '../reduceToArticle'
import errors from '../../errors'

export function reviewArticle (
  reviewer: t.User,
  article: t.Article,
  evaluation: t.Evaluation,
  timestamp: t.Timestamp
): t.ArticleEvent[] {

  if (article.banned) {
    throw errors.articleAlreadyBanned()
  }

  if (article.reviewers.includes(reviewer.userId)) {
    throw errors.reviewerAlreadyListed()
  }

  const articleReviewed: t.ArticleEvent = {
    type: 'ArticleReviewed',
    payload: {
      articleId: article.articleId,
      reviewerId: reviewer.userId,
      evaluation,
      timestamp
    }
  }
  const articlePromoted: t.ArticleEvent = {
    type: 'ArticlePromoted',
    payload: {
      articleId: article.articleId,
      timestamp
    }
  }
  const articleApproved: t.ArticleEvent = {
    type: 'ArticleApproved',
    payload: {
      articleId: article.articleId,
      timestamp
    }
  }
  const articleRejected: t.ArticleEvent = {
    type: 'ArticleRejected',
    payload: {
      articleId: article.articleId,
      timestamp
    }
  }

  const reviewedArticle = reduceToArticle([articleReviewed], article)

  const currentStageRules = article.stageRules[article.currentStage]
  const approvedEvaluations = article.evaluations.filter(
    r => r.evaluation === 'approve'
  )

  const canPromoteArticle =
    reviewedArticle.banned === false &&
    reviewedArticle.evaluations.length === reviewedArticle.reviewers.length &&
    approvedEvaluations.length >= currentStageRules.threshold

  const canApproveArticle =
    canPromoteArticle &&
    reviewedArticle.currentStage === reviewedArticle.lastStage

  const canRejectArticle =
    reviewedArticle.banned === false &&
    reviewedArticle.evaluations.length === reviewedArticle.reviewers.length &&
    approvedEvaluations.length < currentStageRules.threshold

  if (canApproveArticle) {
    return [articleReviewed, articleApproved]
  }
  if (canRejectArticle) {
    return [articleReviewed, articleRejected]
  }
  if (canPromoteArticle) {
    return [articleReviewed, articlePromoted]
  }

  return [articleReviewed]
}

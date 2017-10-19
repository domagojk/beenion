import { ArticleEvent } from './types/events'
import { Article, Stage } from './types/model'

const reduceToArticle =
  (history: ArticleEvent[], initialState?: Article): Article =>
    history.reduce(articleReducer, initialState)

const articleReducer = (article: Article, e: ArticleEvent): Article => {
  const defaultValues = {
    stageRules: null,
    lastStage: null,
    currentStage: 0,
    reviewers: [],
    evaluations: [],
    reviewProcessCompleted: false,
    approved: false,
    banned: false
  }

  switch (e.type) {
    case 'ArticleCreated':
      return {
        ...defaultValues,
        articleId: e.articleId,
        ownerId: e.ownerId
      }
    case 'ArticleStageRulesDefined':
      return {
        ...article,
        stageRules: e.stageRules,
        lastStage: e.stageRules.length - 1 as Stage
      }
    case 'ArticleReviewerInvited':
      return {
        ...article,
        reviewers: [...article.reviewers, e.reviewerId]
      }
    case 'ArticleReviewerRemoved':
      return {
        ...article,
        evaluations: article.evaluations.filter(ev => ev.reviewerId !== e.reviewerId),
        reviewers: article.reviewers.filter(id => id !== e.reviewerId)
      }
    case 'ArticleReviewed':
      return {
        ...article,
        evaluations: [
          ...article.evaluations,
          {
            evaluation: e.evaluation,
            reviewerId: e.reviewerId
          }
        ]
      }
    case 'ArticlePromoted':
      return {
        ...article,
        currentStage: article.currentStage + 1
      }
    case 'ArticleRejected':
      return {
        ...article,
        ...defaultValues,
        reviewProcessCompleted: true,
        approved: false
      }
    case 'ArticleApproved':
      return {
        ...article,
        ...defaultValues,
        reviewProcessCompleted: true,
        approved: true
      }
    case 'ArticleResubmitted':
    case 'ArticleDeleted':
      return {
        ...article,
        ...defaultValues,
        reviewProcessCompleted: false
      }
    case 'ArticleBanned':
      return {
        ...article,
        ...defaultValues,
        banned: true
      }
    case 'ArticleUnbanned':
      return {
        ...article,
        ...defaultValues,
        banned: false
      }
    default:
      return article
  }
}

export default reduceToArticle

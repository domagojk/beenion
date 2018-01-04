import { ArticleEvent, Article } from '../types'

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
        articleId: e.payload.articleId,
        ownerId: e.payload.ownerId
      }
    case 'ArticleStageRulesDefined':
      return {
        ...article,
        stageRules: e.payload.stageRules,
        lastStage: e.payload.stageRules.length - 1
      }
    case 'ArticleReviewerInvited':
      return {
        ...article,
        reviewers: [...article.reviewers, e.payload.reviewerId]
      }
    case 'ArticleReviewerRemoved':
      return {
        ...article,
        evaluations: article.evaluations.filter(ev => ev.reviewerId !== e.payload.reviewerId),
        reviewers: article.reviewers.filter(id => id !== e.payload.reviewerId)
      }
    case 'ArticleReviewed':
      return {
        ...article,
        evaluations: [
          ...article.evaluations,
          {
            evaluation: e.payload.evaluation,
            reviewerId: e.payload.reviewerId
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

import { ArticleId, UserId, Evaluation } from '../index'

export type StageRule = {
  maxReviewers: number
  threshold: number
}

export type Article = {
  articleId: ArticleId
  ownerId: UserId
  stageRules: StageRule[]
  currentStage: number
  lastStage: number
  reviewers: UserId[]
  evaluations: {
    reviewerId: UserId
    evaluation: Evaluation
  }[]
  reviewProcessCompleted: boolean
  approved: boolean
  banned: boolean
}

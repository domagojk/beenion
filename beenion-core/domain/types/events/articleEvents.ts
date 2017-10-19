import {
  UserId,
  ArticleId,
  JournalId,
  StageRule,
  Timestamp,
  Title,
  Description,
  URL,
  Evaluation
} from '../model'

export type ArticleCreated = {
  type: 'ArticleCreated'
  articleId: ArticleId
  journalId: JournalId
  ownerId: UserId
  timestamp: Timestamp
}

export type ArticleDeleted = {
  type: 'ArticleDeleted'
  articleId: ArticleId
  userId: UserId
  timestamp: Timestamp
}

export type ArticleStageRulesDefined = {
  type: 'ArticleStageRulesDefined'
  articleId: ArticleId
  stageRules: StageRule[]
  timestamp: Timestamp
}

export type ArticleDescriptionDefined = {
  type: 'ArticleDescriptionDefined'
  articleId: ArticleId
  description: Description
  timestamp: Timestamp
}

export type ArticleLinkDefined = {
  type: 'ArticleLinkDefined'
  articleId: ArticleId
  link: URL
  timestamp: Timestamp
}

export type ArticleTitleDefined = {
  type: 'ArticleTitleDefined'
  articleId: ArticleId
  title: Title
  timestamp: Timestamp
}

export type ArticlePromoted = {
  type: 'ArticlePromoted'
  userId: UserId
  articleId: ArticleId
  timestamp: Timestamp
}

export type ArticleApproved = {
  type: 'ArticleApproved'
  userId: UserId
  articleId: ArticleId
  timestamp: Timestamp
}

export type ArticleRejected = {
  type: 'ArticleRejected'
  userId: UserId
  articleId: ArticleId
  timestamp: Timestamp
}

export type ApprovedArticleRejected = {
  type: 'ApprovedArticleRejected'
  userId: UserId
  articleId: ArticleId
  timestamp: Timestamp
}

export type ArticleResubmitted = {
  type: 'ArticleResubmitted'
  articleId: ArticleId
  timestamp: Timestamp
}

export type ArticleReviewerInvited = {
  type: 'ArticleReviewerInvited'
  articleId: ArticleId
  reviewerId: UserId
  timestamp: Timestamp
}

export type ArticleReviewerRemoved = {
  type: 'ArticleReviewerRemoved'
  articleId: ArticleId
  reviewerId: UserId
  timestamp: Timestamp
}

export type ArticleReviewed = {
  type: 'ArticleReviewed'
  articleId: ArticleId
  reviewerId: UserId
  evaluation: Evaluation
  timestamp: Timestamp
}

export type ArticleBanned = {
  type: 'ArticleBanned'
  userId: UserId
  articleId: ArticleId
  timestamp: Timestamp
}

export type ArticleUnbanned = {
  type: 'ArticleUnbanned'
  userId: UserId
  articleId: ArticleId
  timestamp: Timestamp
}

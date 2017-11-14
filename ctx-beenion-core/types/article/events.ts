import { type, literal, union } from 'io-ts'
import * as input from '../input'

export const ArticleEvent = union([
  type({
    type: literal('ArticleCreated'),
    articleId: input.ArticleId,
    journalId: input.JournalId,
    ownerId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleDeleted'),
    articleId: input.ArticleId,
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleStageRulesDefined'),
    articleId: input.ArticleId,
    stageRules: input.StageRules,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleDescriptionDefined'),
    articleId: input.ArticleId,
    description: input.Description,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleLinkDefined'),
    articleId: input.ArticleId,
    link: input.URL,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleTitleDefined'),
    articleId: input.ArticleId,
    title: input.Title,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticlePromoted'),
    articleId: input.ArticleId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleApproved'),
    articleId: input.ArticleId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleRejected'),
    articleId: input.ArticleId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ApprovedArticleRejected'),
    userId: input.UserId,
    articleId: input.ArticleId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleResubmitted'),
    articleId: input.ArticleId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleReviewerInvited'),
    articleId: input.ArticleId,
    reviewerId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleReviewerRemoved'),
    articleId: input.ArticleId,
    reviewerId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleReviewed'),
    articleId: input.ArticleId,
    reviewerId: input.UserId,
    evaluation: input.Evaluation,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleBanned'),
    userId: input.UserId,
    articleId: input.ArticleId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleUnbanned'),
    userId: input.UserId,
    articleId: input.ArticleId,
    timestamp: input.Timestamp
  })
])

import { type, literal, union } from 'io-ts'
import * as input from '../input'

export const ArticleEvent = union([
  type({
    type: literal('ArticleCreated'),
    payload: type({
      articleId: input.ArticleId,
      newsletterId: input.NewsletterId,
      ownerId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleDeleted'),
    payload: type({
      articleId: input.ArticleId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleStageRulesDefined'),
    payload: type({
      articleId: input.ArticleId,
      stageRules: input.StageRules,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleDescriptionDefined'),
    payload: type({
      articleId: input.ArticleId,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleLinkDefined'),
    payload: type({
      articleId: input.ArticleId,
      link: input.URL,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleTitleDefined'),
    payload: type({
      articleId: input.ArticleId,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticlePromoted'),
    payload: type({
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleApproved'),
    payload: type({
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleRejected'),
    payload: type({
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ApprovedArticleRejected'),
    payload: type({
      userId: input.UserId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleResubmitted'),
    payload: type({
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleReviewerInvited'),
    payload: type({
      articleId: input.ArticleId,
      reviewerId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleReviewerRemoved'),
    payload: type({
      articleId: input.ArticleId,
      reviewerId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleReviewed'),
    payload: type({
      articleId: input.ArticleId,
      reviewerId: input.UserId,
      evaluation: input.Evaluation,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleBanned'),
    payload: type({
      userId: input.UserId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleUnbanned'),
    payload: type({
      userId: input.UserId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  })
])

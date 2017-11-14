import { type, literal } from 'io-ts'
import * as input from '../input'

export const privateCommands = type({
  CreateUser: type({
    private: literal(true),
    payload: type({
      userId: input.UserId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  })
})

export const publicCommands = type({
  MergeAccount: type({
    userId: input.UserId,
    payload: type({
      mergedUserId: input.UserId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DeclineReviewInvitation: type({
    userId: input.UserId,
    payload: type({
      articleId: input.ArticleId,
      journalId: input.JournalId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  ExpireReviewInvitation: type({
    userId: input.UserId,
    payload: type({
      articleId: input.ArticleId,
      journalId: input.JournalId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RateArticle: type({
    userId: input.UserId,
    payload: type({
      articleOwnerId: input.UserId,
      journalId: input.JournalId,
      articleId: input.ArticleId,
      medal: input.Medal,
      rating: input.Rating,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RateReview: type({
    userId: input.UserId,
    payload: type({
      reviewOwnerId: input.UserId,
      journalId: input.JournalId,
      articleId: input.ArticleId,
      medal: input.Medal,
      rating: input.Rating,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RateUser: type({
    userId: input.UserId,
    payload: type({
      userId: input.UserId,
      medal: input.Medal,
      rating: input.Rating,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  WithdrawArticleVote: type({
    userId: input.UserId,
    payload: type({
      articleOwnerId: input.UserId,
      journalId: input.JournalId,
      articleId: input.ArticleId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  WithdrawReviewVote: type({
    userId: input.UserId,
    payload: type({
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  WithdrawUserVote: type({
    userId: input.UserId,
    payload: type({
      userId: input.UserId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  })
})

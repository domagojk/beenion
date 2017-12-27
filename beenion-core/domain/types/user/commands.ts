import { type, literal } from 'io-ts'
import * as input from '../input'

export const privateCommands = type({
  CreateUser: type({
    private: literal(true),
    payload: type({
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  })
})

export const publicCommands = type({
  DeclineReviewInvitation: type({
    userId: input.UserId,
    payload: type({
      articleId: input.ArticleId,
      newsletterId: input.NewsletterId,
      timestamp: input.Timestamp
    })
  }),

  ExpireReviewInvitation: type({
    userId: input.UserId,
    payload: type({
      articleId: input.ArticleId,
      newsletterId: input.NewsletterId,
      timestamp: input.Timestamp
    })
  }),

  RateArticle: type({
    userId: input.UserId,
    payload: type({
      articleOwnerId: input.UserId,
      newsletterId: input.NewsletterId,
      articleId: input.ArticleId,
      medal: input.Medal,
      rating: input.Rating,
      timestamp: input.Timestamp
    })
  }),

  RateReview: type({
    userId: input.UserId,
    payload: type({
      reviewOwnerId: input.UserId,
      newsletterId: input.NewsletterId,
      articleId: input.ArticleId,
      medal: input.Medal,
      rating: input.Rating,
      timestamp: input.Timestamp
    })
  }),

  RateUser: type({
    userId: input.UserId,
    payload: type({
      userId: input.UserId,
      medal: input.Medal,
      rating: input.Rating,
      timestamp: input.Timestamp
    })
  }),

  WithdrawArticleVote: type({
    userId: input.UserId,
    payload: type({
      articleOwnerId: input.UserId,
      newsletterId: input.NewsletterId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  WithdrawReviewVote: type({
    userId: input.UserId,
    payload: type({
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      newsletterId: input.NewsletterId,
      timestamp: input.Timestamp
    })
  }),

  WithdrawUserVote: type({
    userId: input.UserId,
    payload: type({
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  })
})

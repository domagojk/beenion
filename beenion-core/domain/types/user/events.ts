import { type, literal, union } from 'io-ts'
import * as input from '../input'

export const UserEvent = union([
  type({
    type: literal('UserCreated'),
    payload: type({
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewInvitationDeclined'),
    payload: type({
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewInvitationExpired'),
    payload: type({
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewUpvotedWithGold'),
    payload: type({
      voterId: input.UserId,
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewUpvotedWithSilver'),
    payload: type({
      voterId: input.UserId,
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewUpvotedWithBronze'),
    payload: type({
      voterId: input.UserId,
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewDownvotedWithGold'),
    payload: type({
      voterId: input.UserId,
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewDownvotedWithSilver'),
    payload: type({
      voterId: input.UserId,
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewDownvotedWithBronze'),
    payload: type({
      voterId: input.UserId,
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ReviewVoteWithdrawn'),
    payload: type({
      voterId: input.UserId,
      reviewOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleUpvotedWithGold'),
    payload: type({
      voterId: input.UserId,
      articleOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleUpvotedWithSilver'),
    payload: type({
      voterId: input.UserId,
      articleOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleUpvotedWithBronze'),
    payload: type({
      voterId: input.UserId,
      articleOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleDownvotedWithGold'),
    payload: type({
      voterId: input.UserId,
      articleOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleDownvotedWithSilver'),
    payload: type({
      voterId: input.UserId,
      articleOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleDownvotedWithBronze'),
    payload: type({
      voterId: input.UserId,
      articleOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('ArticleVoteWithdrawn'),
    payload: type({
      voterId: input.UserId,
      articleOwnerId: input.UserId,
      articleId: input.ArticleId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('UserUpvotedWithGold'),
    payload: type({
      voterId: input.UserId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('UserUpvotedWithSilver'),
    payload: type({
      voterId: input.UserId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('UserUpvotedWithBronze'),
    payload: type({
      voterId: input.UserId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('UserDownvotedWithGold'),
    payload: type({
      voterId: input.UserId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('UserDownvotedWithSilver'),
    payload: type({
      voterId: input.UserId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('UserDownvotedWithBronze'),
    payload: type({
      voterId: input.UserId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('UserVoteWithdrawn'),
    payload: type({
      voterId: input.UserId,
      userId: input.UserId,
      timestamp: input.Timestamp
    })
  })
])

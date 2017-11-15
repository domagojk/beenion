import { type, literal, union } from 'io-ts'
import * as input from '../input'

export const UserEvent = union([
  type({
    type: literal('UserCreated'),
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewInvitationDeclined'),
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewInvitationExpired'),
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewUpvotedWithGold'),
    voterId: input.UserId,
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewUpvotedWithSilver'),
    voterId: input.UserId,
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewUpvotedWithBronze'),
    voterId: input.UserId,
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewDownvotedWithGold'),
    voterId: input.UserId,
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewDownvotedWithSilver'),
    voterId: input.UserId,
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewDownvotedWithBronze'),
    voterId: input.UserId,
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ReviewVoteWithdrawn'),
    voterId: input.UserId,
    reviewOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleUpvotedWithGold'),
    voterId: input.UserId,
    articleOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleUpvotedWithSilver'),
    voterId: input.UserId,
    articleOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleUpvotedWithBronze'),
    voterId: input.UserId,
    articleOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleDownvotedWithGold'),
    voterId: input.UserId,
    articleOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleDownvotedWithSilver'),
    voterId: input.UserId,
    articleOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleDownvotedWithBronze'),
    voterId: input.UserId,
    articleOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('ArticleVoteWithdrawn'),
    voterId: input.UserId,
    articleOwnerId: input.UserId,
    articleId: input.ArticleId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('UserUpvotedWithGold'),
    voterId: input.UserId,
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('UserUpvotedWithSilver'),
    voterId: input.UserId,
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('UserUpvotedWithBronze'),
    voterId: input.UserId,
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('UserDownvotedWithGold'),
    voterId: input.UserId,
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('UserDownvotedWithSilver'),
    voterId: input.UserId,
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('UserDownvotedWithBronze'),
    voterId: input.UserId,
    userId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('UserVoteWithdrawn'),
    voterId: input.UserId,
    userId: input.UserId,
    timestamp: input.Timestamp
  })
])

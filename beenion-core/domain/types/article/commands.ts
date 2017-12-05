import { type, literal } from 'io-ts'
import * as input from '../input'

export const privateCommands = type({
  InviteArticleReviewer: type({
    private: literal(true),
    payload: type({
      reviewerId: input.UserId,
      journalId: input.JournalId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  RemoveArticleReviewer: type({
    private: literal(true),
    payload: type({
      reviewerId: input.UserId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  })
})

export const publicCommands = type({
  CreateArticle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      description: input.Description,
      link: input.URL,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  BanArticle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  DeleteArticle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  UnbanArticle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  UpdateArticleDescription: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  UpdateArticleLink: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      link: input.URL,
      timestamp: input.Timestamp
    })
  }),

  UpdateArticleTitle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  RejectApprovedArticle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  ResubmitArticle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      articleId: input.ArticleId,
      timestamp: input.Timestamp
    })
  }),

  ReviewArticle: type({
    userId: input.UserId,
    payload: type({
      reviewerId: input.UserId,
      articleId: input.ArticleId,
      evaluation: input.Evaluation,
      timestamp: input.Timestamp
    })
  })
})

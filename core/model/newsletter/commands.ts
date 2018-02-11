import { type, intersection, partial, literal } from 'io-ts'
import * as input from '../inputTypes'

export const systemCommands = type({
  ResolveProposal: type({
    processManager: literal(true),
    payload: type({
      newsletterId: input.NewsletterId,
      proposalId: input.ProposalId,
      timestamp: input.Timestamp
    })
  })
})

export const userCommands = type({
  CreateNewsletter: type({
    userId: input.UserId,
    payload: intersection([
      type({
        newsletterId: input.NewsletterId,
        title: input.Title,
        description: input.Description,
        timestamp: input.Timestamp
      }),
      partial({
        stages: input.NewsletterStages,
        permissions: input.NewsletterPermissions,
        maxSubscribers: input.NonNegativeInt,
        expireTime: input.Duration
      })
    ])
  }),

  DefineNewsletterMetadata: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      title: input.Title,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  DefineNewsletterStages: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      stages: input.NewsletterStages,
      timestamp: input.Timestamp
    })
  }),

  DefineNewsletterPermissions: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      permissions: input.NewsletterPermissions,
      timestamp: input.Timestamp
    })
  }),

  DefineNumberOfSubscribers: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      maxSubscribers: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DefineProposalExpireTime: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      expireTime: input.Duration,
      timestamp: input.Timestamp
    })
  }),

  DefineNewsletterCategories: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      permissions: input.Categories,
      timestamp: input.Timestamp
    })
  }),

  InviteNewsletterOwner: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      ownerInfo: input.UserInfo,
      timestamp: input.Timestamp
    })
  }),

  ConfirmNewsletterOwnerInvitation: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      ownerInfo: input.UserInfo,
      timestamp: input.Timestamp
    })
  }),

  RemoveNewsletterOwner: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      ownerId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  AddNewsletterEditor: type({
    payload: type({
      editorId: input.UserId,
      newsletterId: input.NewsletterId,
      timestamp: input.Timestamp
    })
  }),

  RemoveNewsletterEditor: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      editorId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  SubscribeToNewsletter: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      email: input.Email,
      timestamp: input.Timestamp
    })
  }),

  UnsubscribeFromNewsletter: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      timestamp: input.Timestamp
    })
  }),

  CreateNewsletterIssue: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId,
      templateId: input.TemplateId,
      issueNum: input.NonNegativeInt,
      links: input.IssueLinks,
      timestamp: input.Timestamp
    })
  }),

  UpdateNewsletterIssue: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId,
      links: input.IssueLinks,
      timestamp: input.Timestamp
    })
  }),

  PublishNewsletterIssue: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId,
      timestamp: input.Timestamp
    })
  }),

  CancelSendingNewsletterIssue: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId,
      timestamp: input.Timestamp
    })
  }),

  ChangeAvailabilityStatus: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      avaiability: input.Avaiability,
      timestamp: input.Timestamp
    })
  }),

  RateReviewers: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      rating: input.ReviewersRating,
      timestamp: input.Timestamp
    })
  }),

  CreateProposal: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      proposalId: input.ProposalId,
      action: input.ProposalAction,
      timestamp: input.Timestamp
    })
  }),

  WithdrawProposal: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      proposalId: input.ProposalId,
      timestamp: input.Timestamp
    })
  })
})

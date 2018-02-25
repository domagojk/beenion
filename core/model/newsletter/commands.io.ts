import { type, intersection, literal, array } from 'io-ts'
import * as input from '../input.io'

const newsletterMetadata = type({
  newsletterId: input.NewsletterId,
  title: input.Title,
  description: input.Description,
  categories: array(input.NewsletterCategory)
})

const newsletterSettings = type({
  newsletterId: input.NewsletterId,
  stages: input.NewsletterStages,
  permissions: input.NewsletterPermissions,
  maxSubscribers: input.NonNegativeInt,
  proposalExpireTime: input.Duration,
  userGroups: array(input.UserGroup)
})

export const commands = {
  CreateNewsletter: type({
    from: input.UserId,
    payload: intersection([
      newsletterSettings,
      newsletterMetadata
    ])
  }),

  DefineNewsletterSettings: type({
    from: input.UserId,
    payload: newsletterSettings
  }),

  DefineNewsletterMetadata: type({
    from: input.UserId,
    payload: newsletterMetadata
  }),

  InviteNewsletterEditor: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      editorInfo: input.UserInfo
    })
  }),

  ConfirmNewsletterEditorInvitation: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      editorId: input.UserInfo
    })
  }),

  RemoveNewsletterEditor: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      editorId: input.UserId
    })
  }),

  AddUserToNewsletterGroup: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      userId: input.UserId,
      group: input.UserGroup
    })
  }),

  RemoveUserFromNewsletterGroup: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      userId: input.UserId,
      group: input.UserGroup
    })
  }),

  CreateNewsletterIssue: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId,
      templateId: input.TemplateId,
      issueNum: input.NonNegativeInt,
      links: input.IssueLinks
    })
  }),

  UpdateNewsletterIssue: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId,
      links: input.IssueLinks
    })
  }),

  PublishNewsletterIssue: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId
    })
  }),

  CancelSendingNewsletterIssue: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      issueId: input.IssueId
    })
  }),

  RateReviewers: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      rating: input.ReviewersRating
    })
  }),

  CreateProposal: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      proposalId: input.ProposalId,
      action: input.ProposalAction
    })
  }),

  WithdrawProposal: type({
    from: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      proposalId: input.ProposalId
    })
  }),

  ResolveProposal: type({
    from: literal('internal'),
    payload: type({
      newsletterId: input.NewsletterId,
      proposalId: input.ProposalId
    })
  })
}

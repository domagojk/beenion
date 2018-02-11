import {
  UserId,
  NewsletterId,
  IssueId,
  ProposalId,
  TemplateId,
  Title,
  Description,
  Email,
  NonNegativeInt,
  Timestamp,
  IssueLinks,
  IssueNum,
  Stages,
  NewsletterPermissions,
  NewsletterCategory,
  Availability,
  ReviewersRating,
  Decision,
  ProposalAction,
  Duration,
  UserInfo
} from '../index'

export type NewsletterEvent =
  | {
    type: 'ProposalExpireTimeDefined'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      expireTime: Duration
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterCategoriesDefined'
    payload: {
      newsletterId: NewsletterId
      categories: NewsletterCategory[]
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterOwnerInvited'
    payload: {
      newsletterId: NewsletterId
      ownerInfo: UserInfo
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterOwnerRemoved'
    payload: {
      newsletterId: NewsletterId
      ownerId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterOwnerAdded'
    payload: {
      newsletterId: NewsletterId
      ownerId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterEditorAdded'
    payload: {
      newsletterId: NewsletterId
      editorId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterEditorRemoved'
    payload: {
      newsletterId: NewsletterId
      editorId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'UserSubscribedToNewsletter'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      email: Email,
      timestamp: Timestamp
    }
  }
  | {
    type: 'UserUnsubscribedFromNewsletter'
    payload: {
      userId: UserId
      newsletterId: NewsletterId
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterIssueCreated'
    payload: {
      newsletterId: NewsletterId
      issueNum: IssueNum
      issueId: IssueId
      templateId: TemplateId
      links: IssueLinks
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterIssueUpdated'
    payload: {
      newsletterId: NewsletterId
      issueId: IssueId
      links: IssueLinks
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterIssuePublished'
    payload: {
      newsletterId: NewsletterId
      issueId: IssueId
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'NewsletterIssueSendingCanceled'
    payload: {
      newsletterId: NewsletterId
      issueId: IssueId
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'UserChangedAvailabilityStatus'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      avaiability: Availability
      timestamp: Timestamp
    }
  }
  | {
    type: 'ReviewersRated'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      rating: ReviewersRating
      timestamp: Timestamp
    }
  }
  | {
    type: 'ProposalCreated'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      proposalId: ProposalId
      action: ProposalAction
      timestamp: Timestamp
    }
  }
  | {
    type: 'ProposalRated'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      proposalId: ProposalId
      decision: Decision
      timestamp: Timestamp
    }
  }
  | {
    type: 'ProposalAccepted'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      proposalId: ProposalId
      timestamp: Timestamp
    }
  }
  | {
    type: 'ProposalRejected'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      proposalId: ProposalId
      timestamp: Timestamp
    }
  }
  | {
    type: 'ProposalWithdrawn'
    payload: {
      newsletterId: NewsletterId
      userId: UserId
      proposalId: ProposalId
      timestamp: Timestamp
    }
  }

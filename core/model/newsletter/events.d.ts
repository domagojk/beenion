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
  UserGroup,
  UserInfo
} from '../types'

type NewsletterEventPayloads = {
  NewsletterCreated: {
    newsletterId: NewsletterId
  }

  NewsletterSettingsDefined: {
    stages: Stages,
    permissions: NewsletterPermissions,
    maxSubscribers: NonNegativeInt,
    userGroups: UserGroup[],
    proposalExpireTime: Duration
  }

  NewsletterMetadataDefined: {
    newsletterId: NewsletterId
    title: Title
    description: Description
    categories: NewsletterCategory[]
  }

  NewsletterEditorInvited: {
    newsletterId: NewsletterId
    editorInfo: UserInfo
  }

  NewsletterEditorRemoved: {
    newsletterId: NewsletterId
    editorId: UserId
  }

  NewsletterEditorAdded: {
    newsletterId: NewsletterId
    editorId: UserId
  }

  UserAddedToNewsletterGroup: {
    newsletterId: NewsletterId
    userId: UserId
  }

  UserRemovedFromNewsletterGroup: {
    newsletterId: NewsletterId
    userId: UserId
  }

  NewsletterIssueCreated: {
    newsletterId: NewsletterId
    issueNum: IssueNum
    issueId: IssueId
    templateId: TemplateId
    links: IssueLinks
  }

  NewsletterIssueUpdated: {
    newsletterId: NewsletterId
    issueId: IssueId
    links: IssueLinks
  }

  NewsletterIssuePublished: {
    newsletterId: NewsletterId
    issueId: IssueId
  }

  NewsletterIssueSendingCanceled: {
    newsletterId: NewsletterId
    issueId: IssueId
  }

  ReviewersRated: {
    newsletterId: NewsletterId
    rating: ReviewersRating
  }

  ProposalCreated: {
    newsletterId: NewsletterId
    proposalId: ProposalId
    action: ProposalAction
  }

  ProposalRated: {
    newsletterId: NewsletterId
    proposalId: ProposalId
    decision: Decision
  }

  ProposalAccepted: {
    newsletterId: NewsletterId
    proposalId: ProposalId
  }

  ProposalRejected: {
    newsletterId: NewsletterId
    proposalId: ProposalId
  }

  ProposalWithdrawn: {
    newsletterId: NewsletterId
    proposalId: ProposalId
  }
}

export type NewsletterEvents = {
  [E in keyof NewsletterEventPayloads]: {
    from: UserId | 'internal'
    type: E
    payload: NewsletterEventPayloads[E]
  }
}
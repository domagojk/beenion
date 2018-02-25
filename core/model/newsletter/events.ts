import { NewsletterEvents } from '../types'
import {
  CreateNewsletter,
  DefineNewsletterSettings,
  DefineNewsletterMetadata,
  InviteNewsletterEditor,
  ConfirmNewsletterEditorInvitation,
  AddUserToNewsletterGroup,
  RemoveUserFromNewsletterGroup,
  RemoveNewsletterEditor,
  CreateNewsletterIssue,
  UpdateNewsletterIssue,
  PublishNewsletterIssue,
  CancelSendingNewsletterIssue,
  RateReviewers,
  CreateProposal,
  WithdrawProposal,
  ResolveProposal
} from './commands.d'

type EventConstructors = {
  [E in keyof NewsletterEvents]: (c: any) => (p: any) => NewsletterEvents[E]
}

export const events: EventConstructors = {
  NewsletterCreated: (command: CreateNewsletter) => () => ({
    type: 'NewsletterCreated',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId
    }
  }),

  NewsletterSettingsDefined: (
    command: DefineNewsletterSettings | CreateNewsletter
  ) => () => ({
    type: 'NewsletterSettingsDefined',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      maxSubscribers: command.payload.maxSubscribers,
      permissions: command.payload.permissions,
      proposalExpireTime: command.payload.proposalExpireTime,
      stages: command.payload.stages,
      userGroups: command.payload.userGroups
    }
  }),

  NewsletterMetadataDefined: (
    command: DefineNewsletterMetadata
  ) => () => ({
    type: 'NewsletterMetadataDefined',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      title: command.payload.title,
      description: command.payload.description,
      categories: command.payload.categories
    }
  }),

  NewsletterEditorInvited: (command: InviteNewsletterEditor) => () => ({
    type: 'NewsletterEditorInvited',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      editorInfo: command.payload.editorInfo
    }
  }),

  NewsletterEditorAdded: (command: ConfirmNewsletterEditorInvitation) => () => ({
    type: 'NewsletterEditorAdded',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      editorId: command.payload.editorId
    }
  }),

  NewsletterEditorRemoved: (command: RemoveNewsletterEditor) => () => ({
    type: 'NewsletterEditorRemoved',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      editorId: command.payload.editorId
    }
  }),

  UserAddedToNewsletterGroup: (command: AddUserToNewsletterGroup) => () => ({
    type: 'UserAddedToNewsletterGroup',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      userId: command.payload.userId
    }
  }),

  UserRemovedFromNewsletterGroup: (command: RemoveUserFromNewsletterGroup) => () => ({
    type: 'UserRemovedFromNewsletterGroup',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      userId: command.payload.userId
    }
  }),

  NewsletterIssueCreated: (command: CreateNewsletterIssue) => () => ({
    type: 'NewsletterIssueCreated',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      issueNum: command.payload.issueNum,
      issueId: command.payload.issueId,
      templateId: command.payload.templateId,
      links: command.payload.links
    }
  }),

  NewsletterIssueUpdated: (command: UpdateNewsletterIssue) => () => ({
    type: 'NewsletterIssueUpdated',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      issueId: command.payload.issueId,
      links: command.payload.links
    }
  }),

  NewsletterIssuePublished: (command: PublishNewsletterIssue) => () => ({
    type: 'NewsletterIssuePublished',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      issueId: command.payload.issueId
    }
  }),

  NewsletterIssueSendingCanceled: (
    command: CancelSendingNewsletterIssue
  ) => () => ({
    type: 'NewsletterIssueSendingCanceled',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      issueId: command.payload.issueId
    }
  }),

  ReviewersRated: (command: RateReviewers) => () => ({
    type: 'ReviewersRated',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      rating: command.payload.rating
    }
  }),

  ProposalCreated: (command: CreateProposal) => () => ({
    type: 'ProposalCreated',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      proposalId: command.payload.proposalId,
      action: command.payload.action
    }
  }),

  ProposalRated: (command: VoteOnProposal) => () => ({
    type: 'ProposalRated',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      proposalId: command.payload.proposalId,
      decision: command.payload.decision
    }
  }),

  ProposalAccepted: (command: VoteOnProposal | ResolveProposal) => () => ({
    type: 'ProposalAccepted',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      proposalId: command.payload.proposalId
    }
  }),

  ProposalRejected: (command: VoteOnProposal | ResolveProposal) => () => ({
    type: 'ProposalRejected',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      proposalId: command.payload.proposalId
    }
  }),

  ProposalWithdrawn: (command: WithdrawProposal) => () => ({
    type: 'ProposalWithdrawn',
    from: command.from,
    payload: {
      newsletterId: command.payload.newsletterId,
      proposalId: command.payload.proposalId
    }
  })
}

import { events } from './events'
import { shouldCreateProposal } from './rules/shouldCreateProposal'
const {
  NewsletterCreated,
  NewsletterSettingsDefined,
  NewsletterMetadataDefined,
  NewsletterEditorInvited,
  NewsletterEditorRemoved,
  NewsletterEditorAdded,
  UserAddedToNewsletterGroup,
  UserRemovedFromNewsletterGroup,
  NewsletterIssueCreated,
  NewsletterIssueUpdated,
  NewsletterIssuePublished,
  NewsletterIssueSendingCanceled,
  ReviewersRated,
  ProposalCreated,
  ProposalRated,
  ProposalAccepted,
  ProposalRejected,
  ProposalWithdrawn
} = events

/*type A = keyof typeof commands
type B = typeof commands

type CommandHandlers = {
  [C in keyof typeof commands]: (
    command: B[C]
  ) => Promise<any>
}*/

export const newsletterCommandHandlers = repository => {
  // helper function abstracting the following:
  //  - validating if user have suficient permissions
  //  - checking if event or proposal should be saved
  const saveEventOrProposal = event => async command => {
    const { save, commit, validate } = await repository({
      id: command.payload.newsletterId,
      projections: {
        newsletter: reduceToNewsletter,
        newsletterGroups: reduceToNewsletterGroups
      }
    })

    return validate(checkPermissions(command.userId, command.type))
      .then(
        commit({
          condition: shouldCreateProposal,
          commit: ProposalCreated(command),
          otherwise: event(command)
        })
      )
      .then(save)
  }

  // command handlers
  return {
    CreateNewsletter: async command => {
      const { save, commit } = await repository({
        create: true
      })

      return commit(NewsletterCreated(command))
        .then(commit(NewsletterSettingsDefined(command)))
        .then(commit(NewsletterMetadataDefined(command)))
        .then(save)
    },

    ConfirmNewsletterEditorInvitation: async command => {
      const { save, commit, validate } = await repository({
        id: command.payload.newsletterId,
        projections: {
          newsletter: reduceToNewsletter
        }
      })

      return validate(isUserInvitedEditor(command))
        .then(commit(NewsletterEditorAdded(command)))
        .then(save)
    },

    ResolveProposal: async command => {
      const { save, commit, validate } = await repository({
        id: command.payload.newsletterId,
        projections: {
          newsletter: reduceToNewsletter,
          proposal: reduceToProposal(command.payload.proposalId)
        }
      })

      return validate(isInvokedByProcessManager(command))
        .then(validate(isValidProposal))
        .then(
          commit({
            condition: shouldRateProposal,
            commit: ProposalRated(command)
          })
        )
        .then(
          commit({
            condition: shouldAcceptProposal,
            commit: [
              ProposalAccepted(command),
              getProposalEvent(command)
            ]
          })
        )
        .then(
          commit({
            condition: shouldRejectProposal,
            commit: ProposalRejected(command)
          })
        )
        .then(save)
    },

    DefineNewsletterMetadata: saveEventOrProposal(NewsletterMetadataDefined),
    DefinedNewsletterSettings: saveEventOrProposal(NewsletterSettingsDefined),
    InviteNewsletterEditor: saveEventOrProposal(NewsletterEditorInvited),
    RemoveNewsletterEditor: saveEventOrProposal(NewsletterEditorRemoved),
    CreateNewsletterIssue: saveEventOrProposal(NewsletterIssueCreated),
    UpdateNewsletterIssue: saveEventOrProposal(NewsletterIssueUpdated),
    PublishNewsletterIssue: saveEventOrProposal(NewsletterIssuePublished),
    RateReviewers: saveEventOrProposal(ReviewersRated),
    WithdrawProposal: saveEventOrProposal(ProposalWithdrawn)
  }
}

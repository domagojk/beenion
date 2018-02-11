import { NewsletterCreated } from './events/NewsletterCreated'
import { NumberOfSubscribersDefined } from './events/NumberOfSubscribersDefined'
import { NewsletterMetadataDefined } from './events/NewsletterMetadataDefined'
import { NewsletterPermissionsDefined } from './events/NewsletterPermissionsDefined'
import { NewsletterStagesDefined } from './events/NewsletterStagesDefined'
import { ProposalExpireTimeDefined } from './events/ProposalExpireTimeDefined'
import { ProposalCreated } from './events/ProposalCreated'
import { shouldCreateProposal } from './rules/shouldCreateProposal'

export const newsletterCommandHandlers = repository => {
  // helper function abstracting the following:
  //  - validating if user have suficient permissions
  //  - checking if event or proposal should be saved
  const saveEventOrProposal = event => async command => {
    const { save, commit, validate } = await repository({
      id: command.payload.newsletterId,
      projections: {
        newsletter: reduceToNewsletter
      }
    })

    return validate(isUserPermitted(command.userId, command.type))
      .then(
        commit(newsletter =>
          shouldCreateProposal(command)(newsletter)
            ? ProposalCreated(command)(newsletter)
            : event(command)(newsletter)
        )
      )
  }

  // command handlers
  return {
    CreateNewsletter: async command => {
      const { save, commit } = await repository({
        id: command.payload.newsletterId,
        projections: {
          newsletter: reduceToNewsletter
        }
      })

      return commit(NewsletterCreated(command))
        .then(commit(NumberOfSubscribersDefined(command)))
        .then(commit(NewsletterMetadataDefined(command)))
        .then(commit(NewsletterPermissionsDefined(command)))
        .then(commit(NewsletterStagesDefined(command)))
        .then(commit(ProposalExpireTimeDefined(command)))
        .then(save)
    },

    ConfirmNewsletterOwnerInvitation: async command => {
      const { save, commit, validate } = await repository({
        id: command.payload.newsletterId,
        projections: {
          newsletter: reduceToNewsletter
        }
      })

      return validate(isUserInvitedOwner(command))
        .then(commit(NewsletterOwnerAdded(command)))
        .then(save)
    },

    SubscribeToNewsletter: async command => {
      const { save, commit, validate } = await repository({
        id: command.payload.newsletterId,
        projections: {
          newsletter: reduceToNewsletter,
          subscriberList: reduceToSubscriberList
        }
      })

      return validate(isUserUnsubscribed(command))
        .then(validate(isSubscibersLimitReached))
        .then(commit(UserSubscribedToNewsletter(command)))
        .then(save)
    },

    UnsubscribeFromNewsletter: async command => {
      const { save, commit, validate } = await repository({
        id: command.payload.newsletterId,
        projections: {
          subscriberList: reduceToSubscriberList
        }
      })

      return validate(isUserSubscribed(command))
        .then(commit(UserUnsubscribedFromNewsletter(command)))
        .then(save)
    },

    ChangeAvailabilityStatus: async command => {
      const { save, commit, validate } = await repository({
        id: command.payload.newsletterId,
        projections: {
          subscriberList: reduceToSubscriberList
        }
      })

      return validate(isUserSubscribed(command))
        .then(commit(UserAvailabilityStatusChanged(command)))
        .then(save)
    },

    ResolveProposal: async command => {
      const { save, commit, validate } = await repository({
        id: command.payload.newsletterId,
        projections: {
          newsletter: reduceToNewsletter,
          proposal: reduceToOroposal(proposalId)
        }
      })

      return validate(isInvokedByProcessManager(command))
        .then(validate(isValidProposal))
        .then(commitIfValid(shouldRateProposal, ProposalRated))
        .then(commitIfValid(shouldAcceptProposal, ProposalAccepted, getProposalEvent))
        .then(commitIfValid(shouldRejectProposal, ProposalRejected))
        .then(save)
    },

    DefineNewsletterMetadata: saveEventOrProposal(NewsletterMetadataDefined),
    DefinedNewsletterStages: saveEventOrProposal(NewsletterStagesDefined),
    DefineNewsletterPermissions: saveEventOrProposal(NewsletterPermissionsDefined),
    DefineNumberOfSubscribers: saveEventOrProposal(NumberOfSubscribersDefined),
    DefineProposalExpireTime: saveEventOrProposal(ProposalExpireTimeDefined),
    DefineNewsletterCategories: saveEventOrProposal(NewsletterCategoriesDefined),
    InviteNewsletterOwner: saveEventOrProposal(NewsletterOwnerInvited),
    RemoveNewsletterOwner: saveEventOrProposal(NewsletterOwnerRemoved),
    AddNewsletterEditor: saveEventOrProposal(NewsletterEditorAdded),
    RemoveNewsletterEditor: saveEventOrProposal(NewsletterEditorRemoved),
    CreateNewsletterIssue: saveEventOrProposal(NewsletterIssueCreated),
    UpdateNewsletterIssue: saveEventOrProposal(NewsletterIssueUpdated),
    PublishNewsletterIssue: saveEventOrProposal(NewsletterIssuePublished),
    CancelSendingNewsletterIssue: saveEventOrProposal(NewsletterIssueSendingCanceled),
    RateReviewers: saveEventOrProposal(ReviewersRated),
    WithdrawProposal: saveEventOrProposal(ProposalWithdrawn)
  }
}

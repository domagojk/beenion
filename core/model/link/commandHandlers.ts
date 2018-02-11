import { LinkReviewed } from './events/LinkReviewed'
import { LinkPromoted } from './events/LinkPromoted'
import { LinkReviewersAssigned } from './events/LinkReviewersAssigned'
import { LinkAccepted } from './events/LinkAccepted'
import { LinkRejected } from './events/LinkRejected'

export const linkCommandHandlers = (repository) => ({
  ReviewLink: async command => {
    const { save, commit, commitIfValid, validate } = await repository({
      id: command.payload.linkId,
      projections: {
        link: LinkRejected
      }
    })

    const reviewers = await getProjection({
      id: command.payload.newsletterId,
      reducer: reduceToReviewers(command.payload.linkId)
    })

    return validate(isUserReviewer(command.userId))
      .then(commit(LinkReviewed(command)))
      .then(commitIfValid(shouldPromoteLink, LinkPromoted))
      .then(commitIfValid(shouldAssignReviewers, LinkReviewersAssigned(reviewers)))
      .then(commitIfValid(shouldAcceptLink, LinkAccepted))
      .then(commitIfValid(shouldRejectLink, LinkRejected))
      .then(save)
  }
})

import { LinkReviewed } from './events/LinkReviewed'
import { LinkPromoted } from './events/LinkPromoted'
import { LinkReviewersAssigned } from './events/LinkReviewersAssigned'
import { LinkAccepted } from './events/LinkAccepted'
import { LinkRejected } from './events/LinkRejected'

export const linkCommandHandlers = (repository) => ({
  ReviewLink: async command => {
    const { save, commit, commitIf, validate } = await repository({
      id: command.payload.linkId,
      projections: {
        link: LinkRejected
      }
    })

    // const reviewers = await getProjection({
    //   id: command.payload.newsletterId,
    //   reducer: reduceToReviewers(command.payload.linkId)
    // })
    // šta ako nema reviewera?
    // ne u istoj transakciji nego pm/cron job?
    // dynamodb subsriber lista sa newsletterid hash i similarity sort

    return validate(isUserReviewer(command.userId))
      .then(commit(LinkReviewed(command)))
      .then(commitIf(shouldPromoteLink, LinkPromoted))
   // .then(commitIf(shouldAssignReviewers, LinkReviewersAssigned(reviewers)))
      .then(commitIf(shouldAcceptLink, LinkAccepted))
      .then(commitIf(shouldRejectLink, LinkRejected))
      .then(save)
  }
})

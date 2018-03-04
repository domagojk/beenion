import { User } from '../user/types'
import { LinkRepository, Evaluation } from './types'
import { NewsletterRepository } from '../newsletter/types'
import { SubscriberRepository } from '../subscriber/types'
import { findReviewersQuery } from '../subscriber/findReviewersQuery'
import { accessDenied, notLinkReviewer } from '../errors'
import { reviewLink } from './reviewLink'
import { resolveLink } from './resolveLink'
import { isStageCompleted, isLinkOwner, isEditor } from './utils'
import {
  linkDeleted,
  approvedLinkRejected,
  linkCreated,
  linkMetadataUpdated,
  linkReviewersAssigned,
  linkReviewerRemoved
} from './events'

type CreateLinkParams = {
  linkId: string
  newsletterId: string
  title: string
  description: string
  url: string
}

type UpdateLinkParams = {
  linkId: string
  title?: string
  description?: string
  url?: string
}

export const linkApi = (
  linkRepo: LinkRepository,
  subscriberRepo: SubscriberRepository,
  newsletterRepo: NewsletterRepository
) => ({
  async get(linkId: string) {
    const link = await linkRepo.get(linkId)
    return link
  },

  async create(user: User, params: CreateLinkParams) {
    const newsletter = await newsletterRepo.get(params.newsletterId)
    const subscriber = await subscriberRepo.getById({
      subscriberId: user.userId,
      newsletterId: params.newsletterId
    })

    if (!subscriber || !newsletter.editors.includes(user.userId)) {
      throw accessDenied()
    }

    return linkRepo.create(
      linkCreated({
        ...params,
        userId: user.userId,
        status: 'pending',
        stage: 0,
        reviews: {}
      })
    )
  },

  async updateMetadata(user: User, params: UpdateLinkParams) {
    const link = await linkRepo.get(params.linkId)
    const newsletter = await newsletterRepo.get(link.newsletterId)

    if (!isLinkOwner(link, user) || !isEditor(newsletter, user)) {
      throw accessDenied()
    }

    return linkRepo.save(linkMetadataUpdated(params))
  },

  async assignReviewers(linkId: string) {
    const link = await linkRepo.get(linkId)
    const newsletter = await newsletterRepo.get(link.newsletterId)
    const reviewers = await subscriberRepo.query(
      findReviewersQuery(link, newsletter)
    )

    return linkRepo.save(
      linkReviewersAssigned({
        linkId: link.linkId,
        reviews: reviewers.reduce(
          (acc, reviewer) => ({
            ...acc,
            [reviewer.userId]: {
              stage: link.stage,
              evaluation: null
            }
          }),
          link.reviews
        ),
        status: 'inReview'
      })
    )
  },

  async removeReviewer(user: User, linkId: string, reviewerId: string) {
    const link = await linkRepo.get(linkId)
    const newsletter = await newsletterRepo.get(link.newsletterId)

    if (!isEditor(newsletter, user) && reviewerId !== user.userId) {
      throw accessDenied()
    }

    if (!link.reviews[reviewerId]) {
      throw notLinkReviewer()
    }

    delete link.reviews[reviewerId]

    return linkRepo.save(
      linkReviewerRemoved({
        linkId: link.linkId,
        reviews: link.reviews,
        status: 'pending'
      })
    )
  },

  async review(user: User, linkId: string, evaluation: Evaluation) {
    const link = await linkRepo.get(linkId)
    const newsletter = await newsletterRepo.get(link.newsletterId)

    return linkRepo
      .commit(reviewLink(link, user, evaluation))
      .then(
        ({ link, commit }) =>
          isStageCompleted(link)
            ? commit(resolveLink(link, newsletter))
            : commit(null)
      )
      .then(linkRepo.saveCommited)
  },

  async rejectApproved(user: User, linkId: string) {
    const link = await linkRepo.get(linkId)
    const newsletter = await newsletterRepo.get(link.newsletterId)

    if (!isEditor(newsletter, user)) {
      throw accessDenied()
    }

    return linkRepo.save(
      approvedLinkRejected({
        linkId: link.linkId,
        status: 'rejected'
      })
    )
  },

  async del(user: User, linkId: string) {
    const link = await linkRepo.get(linkId)

    if (!isLinkOwner(link, user)) {
      throw accessDenied()
    }

    return linkRepo.delete(linkDeleted(link))
  }
})

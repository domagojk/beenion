import { User, UserId } from '../user/types'
import { SingleDocRepo } from '../../repositories/singleDoc/types'
import { Newsletter } from '../newsletter'
import { SubscriberRepository } from '../subscriber/types'
import { findReviewersQuery } from '../subscriber/findReviewersQuery'
import { accessDenied, notLinkReviewer, stageCompleted } from '../errors'
import * as events from './events'
import {
  isStageCompleted,
  isLinkOwner,
  isEditor,
  getApprovedReviews
} from './utils'

type Evaluation = null | 'approved' | 'rejected'

export type Link = {
  id: string
  newsletterId: string
  status: 'pending' | 'inReview' | 'rejected' | 'approved'
  title: string
  description: string
  url: string
  userId: UserId
  stage: number
  reviews: {
    [key in UserId]: {
      stage: number
      evaluation: Evaluation
    }
  }
  version: number
}

type LinkMetadata = {
  title?: string
  description?: string
  url?: string
}

export const linkApi = ({
  linkDoc,
  newsletterDoc,
  subscriberRepo
}: {
  linkDoc: SingleDocRepo<Link>
  newsletterDoc: SingleDocRepo<Newsletter>
  subscriberRepo: SubscriberRepository
}) => ({
  async get(linkId: string) {
    const link = await linkDoc.get(linkId)
    return link
  },

  async create(
    user: User,
    linkId: string,
    newsletterId: string,
    metadata: LinkMetadata
  ) {
    const newsletter = await newsletterDoc.get(newsletterId)
    const subscriber = await subscriberRepo.getById({
      subscriberId: user.userId,
      newsletterId: newsletterId
    })

    if (!subscriber || !newsletter.editors.includes(user.userId)) {
      throw accessDenied()
    }

    return linkDoc.create({
      from: user,
      payload: {
        ...metadata,
        id: linkId,
        userId: user.userId,
        status: 'pending',
        stage: 0,
        reviews: {}
      },
      type: events.LINK_CREATED
    })
  },

  async updateMetadata(user: User, linkId: string, metadata: LinkMetadata) {
    const link = await linkDoc.get(linkId)
    const newsletter = await newsletterDoc.get(link.newsletterId)

    if (!isLinkOwner(link, user) || !isEditor(newsletter, user)) {
      throw accessDenied()
    }

    return linkDoc.save({
      from: user,
      payload: {
        id: linkId,
        ...metadata
      },
      type: events.LINK_METADATA_UPDATED
    })
  },

  async assignReviewers(linkId: string) {
    const link = await linkDoc.get(linkId)
    const newsletter = await newsletterDoc.get(link.newsletterId)
    const reviewers = await subscriberRepo.query(
      findReviewersQuery(link, newsletter)
    )

    return linkDoc.save({
      from: 'internal',
      payload: {
        id: link.id,
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
      },
      type: events.LINK_REVIEWERS_ASSIGNED
    })
  },

  async removeReviewer(user: User, linkId: string, reviewerId: string) {
    const link = await linkDoc.get(linkId)
    const newsletter = await newsletterDoc.get(link.newsletterId)

    if (!isEditor(newsletter, user) && reviewerId !== user.userId) {
      throw accessDenied()
    }

    if (!link.reviews[reviewerId]) {
      throw notLinkReviewer()
    }

    delete link.reviews[reviewerId]

    return linkDoc.save({
      payload: {
        id: link.id,
        reviews: link.reviews,
        status: 'pending'
      },
      from: user,
      type: events.LINK_REVIEWER_REMOVED
    })
  },

  async review(user: User, linkId: string, evaluation: Evaluation) {
    const link = await linkDoc.get(linkId)
    const newsletter = await newsletterDoc.get(link.newsletterId)

    const linkReview = link.reviews[user.userId]

    if (!linkReview) {
      throw notLinkReviewer()
    }

    if (linkReview.stage !== link.stage) {
      throw stageCompleted()
    }

    return linkDoc
      .commit({
        from: user,
        payload: {
          id: link.id,
          reviews: {
            ...link.reviews,
            [user.userId]: {
              stage: link.stage,
              evaluation: evaluation
            }
          }
        },
        type: events.LINK_REVIEWED
      })
      .then(({ doc: link, commit, done }) => {
        if (!isStageCompleted(link)) {
          return done()
        }

        const stageRules = newsletter.stages[link.stage]
        const isInLastStage = link.stage + 1 === newsletter.stages.length

        return isInLastStage
          ? getApprovedReviews(link).length >= stageRules.threshold
            ? commit({
                from: 'internal',
                payload: { id: linkId, status: 'approved' },
                type: events.LINK_APPROVED
              })
            : commit({
                from: 'internal',
                payload: { id: linkId, status: 'rejected' },
                type: events.LINK_REJECTED
              })
          : commit({
              from: 'internal',
              payload: { id: linkId, stage: link.stage + 1 },
              type: events.LINK_PROMOTED
            })
      })
      .then(linkDoc.saveCommited)
  },

  async rejectApproved(user: User, linkId: string) {
    const link = await linkDoc.get(linkId)
    const newsletter = await newsletterDoc.get(link.newsletterId)

    if (!isEditor(newsletter, user)) {
      throw accessDenied()
    }

    return linkDoc.save({
      from: user,
      payload: {
        id: link.id,
        status: 'rejected'
      },
      type: events.APPROVED_LINK_REJECTED
    })
  },

  async del(user: User, linkId: string) {
    const link = await linkDoc.get(linkId)

    if (!isLinkOwner(link, user)) {
      throw accessDenied()
    }

    return linkDoc.delete({
      from: user,
      payload: {
        id: linkId
      },
      type: events.LINK_DELETED
    })
  }
})

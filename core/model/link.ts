import * as err from './errors'
import { User, UserId } from './user'
import { NewsletterApi } from './newsletter'
import { LinkRepository } from '../repositories/link'
import { SubscriberRepository } from '../repositories/subscriber'

export type Evaluation = null | 'accepted' | 'rejected'

export type Link = {
  linkId: string
  newsletterId: string
  status: 'pending' | 'banned' | 'inReview' | 'rejected' | 'approved'
  title: string
  description: string
  url: string
  userId: UserId
  stage: number
  reviews: {
    [key in UserId]: {
      stage: number
      evaluation: null | 'accepted' | 'rejected'
    }
  }
}

export type LinkApi = {
  get(linkId: string): Promise<Link>
  create(
    user: User,
    params: {
      linkId: string
      newsletterId: string
      title: string
      description: string
      url: string
    }
  ): Promise<Link>
  updateMetadata(
    user: User,
    params: {
      linkId: string
      title?: string
      description?: string
      url?: string
    }
  ): Promise<Link>
  del(user: User, linkId: string): Promise<Link>
  assignReviewers(linkId: string): Promise<Link>
  review(
    user: User,
    params: {
      linkId: string
      evaluation: Evaluation
    }
  ): Promise<Link>
}

export const linkApiFactory = (
  linkRepo: LinkRepository,
  subscriberRepo: SubscriberRepository,
  newsletterApi: NewsletterApi
): LinkApi => ({
  get(linkId) {
    return linkRepo.get(linkId)
  },

  async create(user, params) {
    const newsletter = await newsletterApi.get(params.newsletterId)
    const subscriber = await subscriberRepo.findSubscriber({
      subscriberId: user.userId,
      newsletterId: params.newsletterId
    })

    if (!subscriber || !newsletter.editors.includes(user.userId)) {
      throw err.accessDenied()
    }

    return linkRepo.save(
      params.linkId,
      {
        ...params,
        userId: user.userId,
        status: 'pending',
        stage: 0,
        reviews: {}
      },
      'LINK_CREATED'
    )
  },

  async updateMetadata(user, params) {
    const link = await linkRepo.get(params.linkId)
    const newsletter = await newsletterApi.get(link.newsletterId)

    if (
      link.userId !== user.userId ||
      !newsletter.editors.includes(user.userId)
    ) {
      throw err.accessDenied()
    }

    return linkRepo.update(params.linkId, params, 'LINK_METADATA_UPDATED')
  },

  async del(user, linkId) {
    const link = await linkRepo.get(linkId)

    if (link.userId !== user.userId) {
      throw err.accessDenied()
    }

    return linkRepo.delete(linkId, 'LINK_DELETED')
  },

  async assignReviewers(linkId) {
    const link = await linkRepo.get(linkId)
    const newsletter = await newsletterApi.get(link.newsletterId)

    // get only reviewers assigned for current stage
    const stageReviewers = Object.keys(link.reviews).filter(
      userId => link.reviews[userId].stage === link.stage
    )

    const reviewers = await subscriberRepo.findReviewer({
      linkId: link.linkId,
      newsletterId: newsletter.newsletterId,
      minSimilarityRank: newsletter.stages[link.stage].minSimilarityRank,
      exclude: [...stageReviewers, link.userId],
      limit: newsletter.stages[link.stage].minReviews - stageReviewers.length
    })

    return linkRepo.update(
      link.linkId,
      {
        reviews: reviewers.reduce(
          (acc, reviewer) => ({
            ...acc,
            [reviewer]: {
              stage: link.stage,
              evaluation: null
            }
          }),
          link.reviews
        )
      },
      'LINK_REVIEWERS_ASSIGNED'
    )
  },

  async review(user, params) {
    const link = await linkRepo.get(params.linkId)
    const linkReview = link.reviews[user.userId]

    if (!linkReview) {
      throw err.accessDenied()
    }

    if (linkReview.stage !== link.stage) {
      throw err.accessDenied()
    }

    return linkRepo.update(
      link.linkId,
      {
        reviews: {
          [user.userId]: {
            stage: link.stage,
            evaluation: params.evaluation
          }
        }
      },
      'LINK_REVIEWED'
    )
  }
})

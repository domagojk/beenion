import * as err from './errors'
import { User } from './user'
import { newsletterApiFactory, NewsletterRepository } from './newsletter'

type UserId = User['userId']
type Evaluation = null | 'accepted' | 'rejected'

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
      evaluation: Evaluation
    }
  }
}

export type CreateLink = {
  linkId: string
  newsletterId: string
  title: string
  description: string
  url: string
}

export type UpdateLinkMetadata = {
  linkId: string
  title?: string
  description?: string
  url?: string
}

export type ReviewLink = {
  linkId: string
  evaluation: Evaluation
}

export type LinkRepository = {
  get: (id: string) => Promise<Link>
  save: (id: string, doc: Link) => Promise<Link>
  update: (id: string, doc: Link) => Promise<Link>
  delete: (id: string) => Promise<Link>
}

export function linkApiFactory(
  linkRepo: LinkRepository,
  newsletterRepo: NewsletterRepository
) {
  const newsletterApi = newsletterApiFactory(newsletterRepo)
  const linkApi = {
    get(id: string) {
      return linkRepo.get(id)
    },

    create(user: User, command: CreateLink) {
      return linkRepo.save(command.linkId, {
        ...command,
        userId: user.userId,
        status: 'pending',
        stage: 0,
        reviews: {}
      })
    },

    async updateMetadata(user: User, command: UpdateLinkMetadata) {
      const link = await linkApi.get(command.linkId)
      const newsletter = await newsletterApi.get(link.newsletterId)

      if (
        link.userId !== user.userId ||
        !newsletter.editors.includes(user.userId)
      ) {
        throw err.accessDenied()
      }

      return linkRepo.update(newsletter.newsletterId, {
        ...link,
        ...command
      })
    },

    async del(user: User, linkId: string) {
      const link = await linkApi.get(linkId)

      if (link.userId !== user.userId) {
        throw err.accessDenied()
      }

      return linkRepo.delete(linkId)
    },

    async review(user: User, command: ReviewLink) {
      const link = await linkApi.get(command.linkId)
      const linkReview = link.reviews[user.userId]

      if (!linkReview) {
        throw err.accessDenied()
      }

      if (linkReview.stage !== link.stage) {
        throw err.accessDenied()
      }

      return linkRepo.update(link.linkId, {
        ...link,
        reviews: {
          ...link.reviews,
          [user.userId]: {
            stage: link.stage,
            evaluation: command.evaluation
          }
        }
      })
    }
  }

  return linkApi
}

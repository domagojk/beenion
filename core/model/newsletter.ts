import * as err from './errors'
import { User } from './user'

export type Newsletter = {
  newsletterId: string
  title: string
  description: string
  editors: string[]
  categories: string[]
  stages: {
    minSimilarityRank: number
    minReviews: number
  }[]
  maxSubscribers: number
}

type CreateNewsletter = {
  newsletterId: string
  title: string
  description: string
  categories: string[]
  stages: {
    minSimilarityRank: number
    minReviews: number
  }[]
  maxSubscribers: number
}

type UpdateNewsletter = {
  newsletterId: string
  title?: string
  description?: string
  categories?: string[]
  stages?: {
    minSimilarityRank: number
    minReviews: number
  }[]
  maxSubscribers?: number
}

export type NewsletterRepository = {
  get: (id: string) => Promise<Newsletter>
  save: (id: string, doc: Newsletter) => Promise<Newsletter>
  update: (id: string, doc: Newsletter) => Promise<Newsletter>
  delete: (id: string) => Promise<Newsletter>
}

export function newsletterApiFactory(newsletterRepo: NewsletterRepository) {
  const newsletterApi = {
    get(id: string) {
      return newsletterRepo.get(id)
    },

    create(user: User, command: CreateNewsletter) {
      return newsletterRepo.save(command.newsletterId, {
        ...command,
        editors: [user.userId]
      })
    },

    async update(user: User, command: UpdateNewsletter) {
      const newsletter = await newsletterApi.get(command.newsletterId)

      if (!newsletter.editors.includes(user.userId)) {
        throw err.accessDenied()
      }

      return newsletterRepo.update(newsletter.newsletterId, {
        ...command,
        ...newsletter
      })
    },

    async del(user: User, newsletterId: string) {
      const newsletter = await newsletterApi.get(newsletterId)

      if (!newsletter.editors.includes(user.userId)) {
        throw err.accessDenied()
      }

      return newsletterRepo.delete(newsletterId)
    }
  }

  return newsletterApi
}

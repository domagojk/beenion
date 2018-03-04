import { User } from '../user/types'
import { NewsletterRepository, Newsletter } from './types'
import { accessDenied } from '../errors'
import {
  newsletterCreated,
  newsletterMetadataUpdated,
  newsletterDeleted
} from './events'

type CreateNewsletter = {
  newsletterId: string
  title: string
  description: string
  categories: string[]
  stages: Newsletter['stages']
  maxSubscribers: number
}

type UpdateNewsletter = Partial<CreateNewsletter> & { newsletterId: string }

export const newsletterApi = (newsletterRepo: NewsletterRepository) => ({
  async get(id: string) {
    const newsletter = await newsletterRepo.get(id)
    return newsletter
  },

  async create(user: User, params: CreateNewsletter) {
    return newsletterRepo.create(newsletterCreated({
      ...params,
      editors: [user.userId]
    }))
  },

  async update(user: User, params: UpdateNewsletter) {
    const newsletter = await newsletterRepo.get(params.newsletterId)

    if (!newsletter.editors.includes(user.userId)) {
      throw accessDenied()
    }

    return newsletterRepo.save(newsletterMetadataUpdated(params))
  },

  async del(user: User, newsletterId: string) {
    const newsletter = await newsletterRepo.get(newsletterId)

    if (!newsletter.editors.includes(user.userId)) {
      throw accessDenied()
    }

    return newsletterRepo.delete(newsletterDeleted(newsletter))
  }
})

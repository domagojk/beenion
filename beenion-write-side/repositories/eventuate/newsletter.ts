import { makeEventuateClient } from './adapter/makeEventuateClient'
import { NewsletterRepository } from '../../domain/types'
import reduceToNewsletter from '../../domain/entities/reduceToNewsletter'

const eventuate = makeEventuateClient('newsletter')

export const newsletterRepository: NewsletterRepository = {
  getById: userId =>
    eventuate.loadEvents(userId).then(history => ({
      newsletterState: reduceToNewsletter(history),
      save: events => eventuate.save(userId, history, events)
    })),
  create: userId => ({
    save: events => eventuate.create(userId, events)
  })
}

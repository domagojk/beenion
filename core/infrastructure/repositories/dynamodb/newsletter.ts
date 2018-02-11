import { makeDynamoDBClient } from './adapter/makeDynamoDBClient'
import { NewsletterRepository } from '../../domain/types'
import reduceToNewsletter from '../../domain/entities/reduceToNewsletter'

const dynamoDB = makeDynamoDBClient('newsletter')

export const newsletterRepository: NewsletterRepository = {
  getById: userId =>
    dynamoDB.loadEvents(userId).then(history => ({
      newsletterState: reduceToNewsletter(history),
      save: events => dynamoDB.append(userId, history.length, events)
    })),
  create: userId => ({
    save: events => dynamoDB.append(userId, 0, events)
  })
}

import { makeEventuateClient } from './adapter/makeEventuateClient'
import { ArticleRepository } from '../../domain/types'
import reduceToArticle from '../../domain/entities/reduceToArticle'

const eventuate = makeEventuateClient('newsletter')

export const articleRepository: ArticleRepository = {
  getById: userId =>
    eventuate.loadEvents(userId).then(history => ({
      articleState: reduceToArticle(history),
      save: events => eventuate.save(userId, history, events)
    })),
  create: userId => ({
    save: events => eventuate.create(userId, events)
  })
}

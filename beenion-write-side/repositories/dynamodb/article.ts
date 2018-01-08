import { makeDynamoDBClient } from './adapter/makeDynamoDBClient'
import { ArticleRepository } from '../../domain/types'
import reduceToArticle from '../../domain/entities/reduceToArticle'

const dynamoDB = makeDynamoDBClient('article')

export const articleRepository: ArticleRepository = {
  getById: userId =>
    dynamoDB.loadEvents(userId).then(history => ({
      articleState: reduceToArticle(history),
      save: events => dynamoDB.append(userId, history.length, events)
    })),
  create: userId => ({
    save: events => dynamoDB.append(userId, 0, events)
  })
}

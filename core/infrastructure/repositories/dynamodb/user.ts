import { makeDynamoDBClient } from './adapter/makeDynamoDBClient'
import { UserRepository } from '../../domain/types'
import reduceToUser from '../../domain/entities/reduceToUser'

const dynamoDB = makeDynamoDBClient('user')

export const userRepository: UserRepository = {
  getById: userId =>
    dynamoDB.loadEvents(userId).then(history => ({
      userState: reduceToUser(history),
      save: events => dynamoDB.append(userId, history.length, events)
    })),
  create: userId => ({
    save: events => dynamoDB.append(userId, 0, events)
  })
}

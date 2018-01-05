import { makeEventuateClient } from './adapter/makeEventuateClient'
import { UserRepository } from '../../domain/types'
import reduceToUser from '../../domain/entities/reduceToUser'

const eventuate = makeEventuateClient('user')

export const userRepository: UserRepository = {
  getById: userId =>
    eventuate.loadEvents(userId).then(history => ({
      userState: reduceToUser(history),
      save: events => eventuate.save(userId, history, events)
    })),
  create: userId => ({
    save: events => eventuate.create(userId, events)
  })
}

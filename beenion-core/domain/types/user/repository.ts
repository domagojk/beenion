import { User, UserEvent, UserId } from '../index'

export type UserRepository = {
  getById: (id: UserId) => Promise<User>
  save: (params: {
    events: UserEvent[],
    id: UserId,
    expectedVersion: number
  }) => Promise<any>
}

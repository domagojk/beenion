import { User, UserEvent, UserId } from '../index'

export type UserRepository = {
  getById: (id: UserId) => Promise<{
    userState: User,
    save: (events: UserEvent[], version?: number) => Promise<any>
  }>
}

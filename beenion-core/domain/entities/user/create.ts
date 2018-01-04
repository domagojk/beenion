import { UserEvent, UserId, Timestamp } from '../../types'

export function createUser (
  userId: UserId,
  timestamp: Timestamp
): UserEvent[] {

  return [
    {
      type: 'UserCreated',
      payload: {
        userId,
        timestamp
      }
    }
  ]
}

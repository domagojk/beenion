import { UserEvent, UserId, Timestamp } from '../../../types'

export function create (params: {
  userId: UserId
  timestamp: Timestamp
}): UserEvent[] {
  const { userId, timestamp } = params

  return [
    {
      type: 'UserCreated',
      userId,
      timestamp
    }
  ]
}

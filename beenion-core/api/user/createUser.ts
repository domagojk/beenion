import { UserEvent } from 'domain/types/events'
import { createUserId, createTimestamp } from 'domain/typeFactories'

function createUser (command: {
  userId: string
  timestamp: number
}): UserEvent[] {

  const userId = createUserId(command.userId)
  const timestamp = createTimestamp(command.timestamp)

  return [
    {
      type: 'UserCreated',
      userId,
      timestamp
    }
  ]
}

export default createUser

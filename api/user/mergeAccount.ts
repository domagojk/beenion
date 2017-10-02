import { UserEvent } from 'domain/types/events'
import {
  createUserId,
  createTimestamp
} from 'domain/typeFactories'

function mergeAccount (command: {
  originalUserId: string
  mergedUserId: string
  timestamp: number
}): UserEvent[] {

  const originalUserId = createUserId(command.originalUserId)
  const mergedUserId = createUserId(command.mergedUserId)
  const timestamp = createTimestamp(command.timestamp)

  return [
    {
      type: 'UserAccountMerged',
      originalUserId,
      mergedUserId,
      timestamp
    }
  ]
}

export default mergeAccount

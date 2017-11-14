import { UserEvent, UserId, Timestamp } from '../../../types'

export function mergeAccount (params: {
  originalUserId: UserId
  mergedUserId: UserId
  timestamp: Timestamp
}): UserEvent[] {
  const { originalUserId, mergedUserId, timestamp } = params

  return [
    {
      type: 'UserAccountMerged',
      originalUserId,
      mergedUserId,
      timestamp
    }
  ]
}

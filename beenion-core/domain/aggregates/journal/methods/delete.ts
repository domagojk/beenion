import { JournalEvent, User, Journal, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function del (params: {
  user: User
  journal: Journal
  timestamp: Timestamp
}): JournalEvent[] {
  const { user, journal, timestamp } = params

  if (!privileges.canDeleteJournal(user)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalDeleted',
      userId: user.userId,
      journalId: journal.journalId,
      timestamp
    }
  ]
}

import { JournalEvent, User, Journal, Title, Timestamp } from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function defineTitle (params: {
  user: User
  journal: Journal
  title: Title
  timestamp: Timestamp
}): JournalEvent[] {
  const { user, journal, title, timestamp } = params

  if (!privileges.canUpdateJournal(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalTitleDefined',
      journalId: journal.journalId,
      title,
      timestamp
    }
  ]
}

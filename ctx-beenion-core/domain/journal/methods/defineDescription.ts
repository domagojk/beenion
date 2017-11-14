import * as t from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function defineDescription (params: {
  user: t.User
  journal: t.Journal
  description: t.Description
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, description, timestamp } = params

  if (!privileges.canUpdateJournal(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalDescriptionDefined',
      journalId: journal.journalId,
      description,
      timestamp
    }
  ]
}

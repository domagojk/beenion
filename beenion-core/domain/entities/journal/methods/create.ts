import * as t from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function create (params: {
  user: t.User
  journalId: t.JournalId
  title: t.Title
  description: t.Description
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journalId, title, description, timestamp } = params

  if (!privileges.canCreateJournal(user)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalCreated',
      journalId,
      ownerId: user.userId,
      timestamp
    },
    {
      type: 'JournalTitleDefined',
      journalId,
      title,
      timestamp
    },
    {
      type: 'JournalDescriptionDefined',
      journalId,
      description,
      timestamp
    },
    {
      type: 'JournalPrivilegeDefined',
      journalId,
      privilege: 'canUpdateJournal',
      permission: {
        users: [user.userId]
      },
      timestamp
    }
  ]
}

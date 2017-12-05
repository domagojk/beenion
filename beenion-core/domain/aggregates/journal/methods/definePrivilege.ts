import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function definePrivilege (params: {
  user: t.User
  journal: t.Journal
  privilege: t.JournalPrivilege
  permission: t.JournalPermission
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, privilege, timestamp, permission } = params

  if (!privileges.canUpdatePrivilege(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalPrivilegeDefined',
      journalId: journal.journalId,
      privilege,
      permission,
      timestamp
    }
  ]
}

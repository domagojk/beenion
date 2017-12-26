import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function removePermission (params: {
  user: t.User
  journal: t.Journal
  privilege: t.JournalPrivilege
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, privilege, timestamp } = params

  if (!privileges.canUpdatePrivilege(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalPrivilegeRemoved',
      payload: {
        journalId: journal.journalId,
        privilege,
        timestamp
      }
    }
  ]
}

import * as t from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function removeRankCalcEvent (params: {
  user: t.User
  journal: t.Journal
  userEventType: t.UserEvent['type']
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, userEventType, timestamp } = params

  if (!privileges.canUpdateRankCalcParams(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalRankCalcEventRemoved',
      journalId: journal.journalId,
      userEventType,
      timestamp
    }
  ]
}

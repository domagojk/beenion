import * as t from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function removeRankCalcGroup (params: {
  user: t.User
  journal: t.Journal
  group: t.RankGroup
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, group, timestamp } = params

  if (!privileges.canUpdateRankCalcParams(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalRankCalcGroupRemoved',
      journalId: journal.journalId,
      group,
      timestamp
    }
  ]
}

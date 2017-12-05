import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function defineRankCalcGroup (params: {
  user: t.User
  journal: t.Journal
  rankRange: t.RankRange
  group: t.RankGroup
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, rankRange, group, timestamp } = params

  if (!privileges.canUpdateRankCalcParams(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalRankCalcGroupDefined',
      journalId: journal.journalId,
      group,
      rankRange,
      timestamp
    }
  ]
}

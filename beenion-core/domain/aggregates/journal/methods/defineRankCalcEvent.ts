import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function defineRankCalcEvent (params: {
  user: t.User
  journal: t.Journal
  userEventType: t.UserEvent['type']
  factor: t.RankFactor
  group: t.RankGroup
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, userEventType, factor, group, timestamp } = params

  if (!privileges.canUpdateRankCalcParams(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalRankCalcEventDefined',
      payload: {
        journalId: journal.journalId,
        userEventType,
        factor,
        group,
        timestamp
      }
    }
  ]
}

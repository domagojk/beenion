import { JournalEvent, User, Journal, Stage, Timestamp } from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function removeStageRule (params: {
  user: User
  journal: Journal
  stage: Stage
  timestamp: Timestamp
}): JournalEvent[] {
  const { user, journal, stage, timestamp } = params

  if (journal.stageRules[stage] === undefined) {
    throw errors.stageNotDefined()
  }

  if (journal.stageRules[stage + 1] !== undefined) {
    throw errors.stageNotFinal()
  }

  if (privileges.canUpdateStageRules(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalStageRuleRemoved',
      journalId: journal.journalId,
      stage,
      timestamp
    }
  ]
}

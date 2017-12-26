import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function defineStageRule (params: {
  user: t.User
  journal: t.Journal
  stage: t.Stage
  stageRule: t.StageRule
  timestamp: t.Timestamp
}): t.JournalEvent[] {
  const { user, journal, stage, stageRule, timestamp } = params

  if (stage > journal.stageRules.length) {
    throw errors.stageTooLarge()
  }

  if (!privileges.canUpdateStageRules(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalStageRuleDefined',
      payload: {
        journalId: journal.journalId,
        stage,
        stageRule,
        timestamp
      }
    }
  ]
}

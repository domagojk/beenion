import { JournalEvent } from 'domain/types/events'
import { canDefineStageRule } from 'domain/businessRules'
import { JOURNAL_STAGE_RULES_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createStage,
  createStageRule,
  createTimestamp
} from 'domain/typeFactories'

function defineStageRule (command: {
  userHistory: object[]
  journalHistory: object[]
  stage: number
  stageRule: object
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const stage = createStage(command.stage)
  const stageRule = createStageRule(command.stageRule)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canDefineStageRule(user, journal, stage)) {
    throw new Error(JOURNAL_STAGE_RULES_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalStageRuleDefined',
      journalId: journal.journalId,
      stage,
      stageRule,
      timestamp
    }
  ]
}

export default defineStageRule

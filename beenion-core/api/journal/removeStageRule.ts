import { JournalEvent } from 'domain/types/events'
import { canRemoveStageRule } from 'domain/businessRules'
import { JOURNAL_STAGE_RULES_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createStage,
  createTimestamp
} from 'domain/typeFactories'

function removeStageRule (command: {
  userHistory: object[]
  journalHistory: object[]
  stage: number
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const stage = createStage(command.stage)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canRemoveStageRule(user, journal, stage)) {
    throw new Error(JOURNAL_STAGE_RULES_UPDATE_NOT_ALLOWED)
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

export default removeStageRule

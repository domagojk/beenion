import { JournalEvent } from 'domain/types/events'
import { canUpdateRankCalcParams } from 'domain/businessRules'
import { JOURNAL_RANKCALCPARAMS_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createUserEventType,
  createRankFactor,
  createRankGroup,
  createTimestamp
} from 'domain/typeFactories'

function defineRankCalcEvent (command: {
  userHistory: object[]
  journalHistory: object[]
  userEventType: string
  factor: number
  group: string
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const userEventType = createUserEventType(command.userEventType)
  const factor = createRankFactor(command.factor)
  const group = createRankGroup(command.group)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canUpdateRankCalcParams(user, journal)) {
    throw new Error(JOURNAL_RANKCALCPARAMS_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalRankCalcEventDefined',
      journalId: journal.journalId,
      userEventType,
      factor,
      group,
      timestamp
    }
  ]
}

export default defineRankCalcEvent

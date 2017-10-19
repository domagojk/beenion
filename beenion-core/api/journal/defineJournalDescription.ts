import { JournalEvent } from 'domain/types/events'
import { canUpdateJournal } from 'domain/businessRules'
import { JOURNAL_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createDescription,
  createTimestamp
} from 'domain/typeFactories'

function defineJournalDescription (command: {
  userHistory: object[]
  journalHistory: object[]
  description: string
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const description = createDescription(command.description)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canUpdateJournal(user, journal)) {
    throw new Error(JOURNAL_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalDescriptionDefined',
      journalId: journal.journalId,
      description,
      timestamp
    }
  ]
}

export default defineJournalDescription

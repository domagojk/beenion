import { JournalEvent } from 'domain/types/events'
import { canUpdateJournal } from 'domain/businessRules'
import { JOURNAL_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createTitle,
  createTimestamp
} from 'domain/typeFactories'

function defineJournalTitle (command: {
  userHistory: object[]
  journalHistory: object[]
  title: string
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const title = createTitle(command.title)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canUpdateJournal(user, journal)) {
    throw new Error(JOURNAL_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalTitleDefined',
      journalId: journal.journalId,
      title,
      timestamp
    }
  ]
}

export default defineJournalTitle

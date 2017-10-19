import { JournalEvent } from 'domain/types/events'
import { canDeleteJournal } from 'domain/businessRules'
import { JOURNAL_DELETE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function deleteJournal (command: {
  userHistory: object[]
  journalHistory: object[]
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canDeleteJournal(user, journal)) {
    throw new Error(JOURNAL_DELETE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalDeleted',
      userId: user.userId,
      journalId: journal.journalId,
      timestamp
    }
  ]
}

export default deleteJournal

import { JournalEvent } from 'domain/types/events'
import { canUpdateJournalPrivilege } from 'domain/businessRules'
import { JOURNAL_PRIVILEGE_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalPrivilege,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function removeJournalPermission (command: {
  userHistory: object[]
  journalHistory: object[]
  privilege: string,
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const privilege = createJournalPrivilege(command.privilege)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canUpdateJournalPrivilege(user, journal)) {
    throw new Error(JOURNAL_PRIVILEGE_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalPrivilegeRemoved',
      journalId: journal.journalId,
      privilege,
      timestamp
    }
  ]
}

export default removeJournalPermission

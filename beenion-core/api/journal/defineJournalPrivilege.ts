import { JournalEvent } from 'domain/types/events'
import { canUpdateJournalPrivilege } from 'domain/businessRules'
import { JOURNAL_PRIVILEGE_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalPrivilege,
  createJournalPermission,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function defineJournalPrivilege (command: {
  userHistory: object[]
  journalHistory: object[]
  privilege: string,
  permission: string,
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const privilege = createJournalPrivilege(command.privilege)
  const permission = createJournalPermission(command.permission)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canUpdateJournalPrivilege(user, journal)) {
    throw new Error(JOURNAL_PRIVILEGE_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalPrivilegeDefined',
      journalId: journal.journalId,
      privilege,
      permission,
      timestamp
    }
  ]
}

export default defineJournalPrivilege

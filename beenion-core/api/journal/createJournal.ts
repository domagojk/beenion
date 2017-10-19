import { JournalEvent } from 'domain/types/events'
import { canCreateJournal } from 'domain/businessRules'
import { JOURNAL_CREATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createJornalId,
  createTitle,
  createDescription,
  createTimestamp
} from 'domain/typeFactories'

function createJournal (command: {
  userHistory: object[]
  journalId: string
  title: string
  description: string
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalId = createJornalId(command.journalId)
  const title = createTitle(command.title)
  const description = createDescription(command.description)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)

  if (!canCreateJournal(user)) {
    throw new Error(JOURNAL_CREATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalCreated',
      journalId,
      ownerId: user.userId,
      timestamp
    },
    {
      type: 'JournalTitleDefined',
      journalId,
      title,
      timestamp
    },
    {
      type: 'JournalDescriptionDefined',
      journalId,
      description,
      timestamp
    },
    {
      type: 'JournalPrivilegeDefined',
      journalId,
      privilege: 'canUpdateJournal',
      permission: {
        users: [user.userId]
      },
      timestamp
    }
  ]
}

export default createJournal

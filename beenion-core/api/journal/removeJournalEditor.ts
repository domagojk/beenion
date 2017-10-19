import { JournalEvent } from 'domain/types/events'
import { canRemoveJournalEditor } from 'domain/businessRules'
import { JOURNAL_REMOVE_EDITOR_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createUserId,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function removeJournalEditor (command: {
  userHistory: object[]
  journalHistory: object[]
  editorId: string,
  timestamp: number
}): JournalEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const editorId = createUserId(command.editorId)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canRemoveJournalEditor(editorId, user, journal)) {
    throw new Error(JOURNAL_REMOVE_EDITOR_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalEditorRemoved',
      journalId: journal.journalId,
      userId: user.userId,
      editorId,
      timestamp
    }
  ]
}

export default removeJournalEditor

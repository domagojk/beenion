import { JournalEvent } from 'domain/types/events'
import { canConfirmJournalEditor } from 'domain/businessRules'
import { JOURNAL_CONFIRM_EDITOR_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createUserId,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function confirmJournalEditor (command: {
  editorHistory: object[]
  journalHistory: object[]
  invitedEditorId: string,
  timestamp: number
}): JournalEvent[] {

  const editorHistory = createUserHistory(command.editorHistory)
  const invitedEditorId = createUserId(command.invitedEditorId)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const editor = reduceToUser(editorHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canConfirmJournalEditor(invitedEditorId, journal)) {
    throw new Error(JOURNAL_CONFIRM_EDITOR_NOT_ALLOWED)
  }

  return [
    {
      type: 'JournalEditorConfirmed',
      journalId: journal.journalId,
      editorId: invitedEditorId,
      confirmedEditorId: editor.userId,
      timestamp
    }
  ]
}

export default confirmJournalEditor

import { JournalEvent, User, Journal, UserInfo, Timestamp } from '../../../types'
import errors from '../../errors'

export function confirmEditor (params: {
  editor: User
  journal: Journal
  editorInfo: UserInfo,
  timestamp: Timestamp
}): JournalEvent[] {
  const { editor, journal, editorInfo, timestamp } = params

  if (
    journal.editors.invited.filter(
      editor =>
        editor.email === editorInfo.email ||
        editor.twitterHandle === editorInfo.twitterHandle
    ).length === 0
  ) {
    throw errors.editorNotInvited()
  }

  if (
    journal.editors.confirmed.filter(
      editor =>
        editor.email === editorInfo.email ||
        editor.twitterHandle === editorInfo.twitterHandle
    ).length !== 0
  ) {
    throw errors.editorAlreadyConfirmed()
  }

  return [
    {
      type: 'JournalEditorConfirmed',
      journalId: journal.journalId,
      editorId: editor.userId,
      editorInfo,
      timestamp
    }
  ]
}

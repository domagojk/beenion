import { JournalEvent, User, Journal, UserInfo, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function addEditor (params: {
  user: User
  journal: Journal
  editorInfo: UserInfo
  timestamp: Timestamp
}): JournalEvent[] {
  const { user, journal, editorInfo, timestamp } = params

  if (
    journal.editors.invited.filter(
      editor =>
        editor.email === editorInfo.email ||
        editor.twitterHandle === editorInfo.twitterHandle
    ).length !== 0
  ) {
    throw errors.editorAlreadyInvited()
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

  if (privileges.canUpdateEditor(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'JournalEditorAdded',
      journalId: journal.journalId,
      userId: user.userId,
      editorInfo,
      timestamp
    }
  ]
}

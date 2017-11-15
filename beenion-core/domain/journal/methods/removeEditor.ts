import { JournalEvent, User, Journal, UserId, Timestamp } from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function removeEditor (params: {
  user: User
  journal: Journal
  editorId: UserId
  timestamp: Timestamp
}): JournalEvent[] {
  const { user, journal, timestamp, editorId } = params

  if (
    !journal.editors.invited.includes(editorId) &&
    !journal.editors.confirmed.includes(editorId)
  ) {
    throw errors.editorNotListed()
  }

  if (!privileges.canUpdateEditor(user, journal)) {
    throw errors.permisionDenied()
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

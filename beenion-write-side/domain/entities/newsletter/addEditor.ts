import { NewsletterEvent, User, Newsletter, UserInfo, Timestamp } from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function addNewsletterEditor (
  user: User,
  newsletter: Newsletter,
  editorInfo: UserInfo,
  timestamp: Timestamp
): NewsletterEvent[] {

  if (
    newsletter.editors.invited.filter(
      editor =>
        editor.email === editorInfo.email ||
        editor.twitterHandle === editorInfo.twitterHandle
    ).length !== 0
  ) {
    throw errors.editorAlreadyInvited()
  }

  if (
    newsletter.editors.confirmed.filter(
      editor =>
        editor.email === editorInfo.email ||
        editor.twitterHandle === editorInfo.twitterHandle
    ).length !== 0
  ) {
    throw errors.editorAlreadyConfirmed()
  }

  if (privileges.canUpdateEditor(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterEditorAdded',
      payload: {
        newsletterId: newsletter.newsletterId,
        userId: user.userId,
        editorInfo,
        timestamp
      }
    }
  ]
}

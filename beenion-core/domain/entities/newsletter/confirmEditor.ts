import { NewsletterEvent, User, Newsletter, UserInfo, Timestamp } from '../../types'
import errors from '../../errors'

export function confirmNewsletterEditor (
  editor: User,
  newsletter: Newsletter,
  editorInfo: UserInfo,
  timestamp: Timestamp
): NewsletterEvent[] {

  if (
    newsletter.editors.invited.filter(
      editor =>
        editor.email === editorInfo.email ||
        editor.twitterHandle === editorInfo.twitterHandle
    ).length === 0
  ) {
    throw errors.editorNotInvited()
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

  return [
    {
      type: 'NewsletterEditorConfirmed',
      payload: {
        newsletterId: newsletter.newsletterId,
        editorId: editor.userId,
        editorInfo,
        timestamp
      }
    }
  ]
}

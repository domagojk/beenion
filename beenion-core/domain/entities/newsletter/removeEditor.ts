import { NewsletterEvent, User, Newsletter, UserId, Timestamp } from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function removeNewsletterEditor (
  user: User,
  newsletter: Newsletter,
  editorId: UserId,
  timestamp: Timestamp
): NewsletterEvent[] {

  if (
    !newsletter.editors.invited.includes(editorId) &&
    !newsletter.editors.confirmed.includes(editorId)
  ) {
    throw errors.editorNotListed()
  }

  if (!privileges.canUpdateEditor(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterEditorRemoved',
      payload: {
        newsletterId: newsletter.newsletterId,
        userId: user.userId,
        editorId,
        timestamp
      }
    }
  ]
}

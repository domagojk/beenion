import { NewsletterEvent, User, Newsletter, Timestamp } from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function deleteNewsletter (
  user: User,
  newsletter: Newsletter,
  timestamp: Timestamp
): NewsletterEvent[] {

  if (!privileges.canDeleteNewsletter(user)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterDeleted',
      payload: {
        userId: user.userId,
        newsletterId: newsletter.newsletterId,
        timestamp
      }
    }
  ]
}

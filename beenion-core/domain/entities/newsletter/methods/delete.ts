import { NewsletterEvent, User, Newsletter, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function del (params: {
  user: User
  newsletter: Newsletter
  timestamp: Timestamp
}): NewsletterEvent[] {
  const { user, newsletter, timestamp } = params

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

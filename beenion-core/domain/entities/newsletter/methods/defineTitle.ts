import { NewsletterEvent, User, Newsletter, Title, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function defineTitle (params: {
  user: User
  newsletter: Newsletter
  title: Title
  timestamp: Timestamp
}): NewsletterEvent[] {
  const { user, newsletter, title, timestamp } = params

  if (!privileges.canUpdateNewsletter(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterTitleDefined',
      payload: {
        newsletterId: newsletter.newsletterId,
        title,
        timestamp
      }
    }
  ]
}

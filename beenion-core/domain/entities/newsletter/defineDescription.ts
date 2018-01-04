import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function defineNewsletterDescription (
  user: t.User,
  newsletter: t.Newsletter,
  description: t.Description,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

  if (!privileges.canUpdateNewsletter(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterDescriptionDefined',
      payload: {
        newsletterId: newsletter.newsletterId,
        description,
        timestamp
      }
    }
  ]
}

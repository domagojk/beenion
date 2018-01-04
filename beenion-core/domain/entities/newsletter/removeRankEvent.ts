import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function removeNewsletterRankEvent (
  user: t.User,
  newsletter: t.Newsletter,
  userEventType: t.UserEvent['type'],
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

  if (!privileges.canUpdateRankCalcParams(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterRankEventRemoved',
      payload: {
        newsletterId: newsletter.newsletterId,
        userEventType,
        timestamp
      }
    }
  ]
}

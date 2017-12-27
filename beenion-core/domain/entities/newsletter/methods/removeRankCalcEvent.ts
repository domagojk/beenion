import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function removeRankCalcEvent (params: {
  user: t.User
  newsletter: t.Newsletter
  userEventType: t.UserEvent['type']
  timestamp: t.Timestamp
}): t.NewsletterEvent[] {
  const { user, newsletter, userEventType, timestamp } = params

  if (!privileges.canUpdateRankCalcParams(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterRankCalcEventRemoved',
      payload: {
        newsletterId: newsletter.newsletterId,
        userEventType,
        timestamp
      }
    }
  ]
}

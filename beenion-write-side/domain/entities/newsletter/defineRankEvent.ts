import * as t from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function defineNewsletterRankEvent (
  user: t.User,
  newsletter: t.Newsletter,
  userEventType: t.UserEvent['type'],
  factor: t.RankFactor,
  group: t.RankGroup,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

  if (!privileges.canUpdateRankCalcParams(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterRankEventDefined',
      payload: {
        newsletterId: newsletter.newsletterId,
        userEventType,
        factor,
        group,
        timestamp
      }
    }
  ]
}

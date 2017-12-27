import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function defineRankCalcEvent (params: {
  user: t.User
  newsletter: t.Newsletter
  userEventType: t.UserEvent['type']
  factor: t.RankFactor
  group: t.RankGroup
  timestamp: t.Timestamp
}): t.NewsletterEvent[] {
  const { user, newsletter, userEventType, factor, group, timestamp } = params

  if (!privileges.canUpdateRankCalcParams(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterRankCalcEventDefined',
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

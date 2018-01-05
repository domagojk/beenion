import * as t from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function defineNewsletterRankGroup (
  user: t.User,
  newsletter: t.Newsletter,
  rankRange: t.RankRange,
  group: t.RankGroup,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

  if (!privileges.canUpdateRankCalcParams(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterRankGroupDefined',
      payload: {
        newsletterId: newsletter.newsletterId,
        group,
        rankRange,
        timestamp
      }
    }
  ]
}

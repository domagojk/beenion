import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function removeNewsletterRankGroup (
  user: t.User,
  newsletter: t.Newsletter,
  group: t.RankGroup,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

  if (!privileges.canUpdateRankCalcParams(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterRankGroupRemoved',
      payload: {
        newsletterId: newsletter.newsletterId,
        group,
        timestamp
      }
    }
  ]
}

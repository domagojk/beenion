import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function defineRankCalcGroup (params: {
  user: t.User
  newsletter: t.Newsletter
  rankRange: t.RankRange
  group: t.RankGroup
  timestamp: t.Timestamp
}): t.NewsletterEvent[] {
  const { user, newsletter, rankRange, group, timestamp } = params

  if (!privileges.canUpdateRankCalcParams(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterRankCalcGroupDefined',
      payload: {
        newsletterId: newsletter.newsletterId,
        group,
        rankRange,
        timestamp
      }
    }
  ]
}

import { Link } from './types'
import { Newsletter } from '../newsletter/types'
import { getApprovedReviews } from './utils'
import { linkApproved, linkRejected, linkPromoted } from './events'

export function resolveLink(link: Link, newsletter: Newsletter) {
  const stageRules = newsletter.stages[link.stage]
  const linkId = link.linkId
  const isInLastStage = link.stage + 1 === newsletter.stages.length

  return isInLastStage
    ? getApprovedReviews(link).length >= stageRules.limit
      ? linkApproved({ linkId, status: 'approved' })
      : linkRejected({ linkId, status: 'rejected' })
    : linkPromoted({ linkId, stage: link.stage + 1 })
}

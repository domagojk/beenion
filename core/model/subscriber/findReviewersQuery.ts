import { Newsletter } from '../newsletter/types'
import { Link } from '../link/types'
import { getStageReviewers } from '../link/utils'

export function findReviewersQuery(link: Link, newsletter: Newsletter) {
  const stageRules = newsletter.stages[link.stage]
  const stageReviewers = getStageReviewers(link)

  return {
    newsletterId: link.newsletterId,
    minSimilarityRank: stageRules.minSimilarityRank,
    minReviews: stageRules.minReviews,
    exclude: [...stageReviewers.map(review => review.userId), link.userId],
    limit: stageRules.reviewers - stageReviewers.length
  }
}

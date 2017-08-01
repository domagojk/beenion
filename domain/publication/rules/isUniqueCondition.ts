import { PublicationCondition } from '../types/PublicationConditions'

function isUniqueCondition (c: PublicationCondition) {
  if (
    (c.specificReviewers.length && (c.reviewersWithBeenionRank || c.reviewersWithPublicationRank)) ||
    (c.reviewersWithBeenionRank && (c.specificReviewers.length || c.reviewersWithPublicationRank)) ||
    (c.reviewersWithPublicationRank && (c.reviewersWithBeenionRank || c.specificReviewers.length))
  ) {
    return false
  }

  return true
}

export default isUniqueCondition

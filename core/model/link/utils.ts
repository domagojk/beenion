import { Link } from './index'
import { User } from '../user/types'
import { Newsletter } from '../newsletter'

export function isLinkOwner(link: Link, user: User) {
  return link.userId === user.userId
}

export function isEditor(newsletter: Newsletter, user: User) {
  return newsletter.editors.includes(user.userId)
}

export function isStageCompleted(link: Link) {
  return (
    getStageReviewers(link).filter(item => !item.review.evaluation).length === 0
  )
}

export function getStageReviewers(link: Link) {
  return Object.keys(link.reviews)
    .filter(userId => link.reviews[userId].stage === link.stage)
    .map(userId => ({
      userId,
      review: link.reviews[userId]
    }))
}

export function getApprovedReviews(link: Link) {
  return getStageReviewers(link).filter(
    item => item.review.evaluation === 'approved'
  )
}

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
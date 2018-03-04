import { User } from '../user/types'
import { Link, Evaluation } from './types'
import { stageCompleted, notLinkReviewer } from '../errors'
import { linkReviewed } from './events'

export function reviewLink(link: Link, user: User, evaluation: Evaluation) {
  const linkReview = link.reviews[user.userId]

  if (!linkReview) {
    throw notLinkReviewer()
  }

  if (linkReview.stage !== link.stage) {
    throw stageCompleted()
  }

  return linkReviewed({
    linkId: link.linkId,
    reviews: {
      [user.userId]: {
        stage: link.stage,
        evaluation: evaluation
      }
    }
  })
}

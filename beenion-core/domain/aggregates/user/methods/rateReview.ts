import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function rateReview (params: {
  voter: t.User
  reviewOwner: t.User
  journal: t.Journal
  articleId: t.ArticleId
  medal: t.Medal
  rating: t.Rating
  timestamp: t.Timestamp
}): t.UserEvent[] {
  const { voter, reviewOwner, journal, articleId, medal, rating, timestamp } = params

  if (!privileges[`canRateReviewWith${medal}`](voter, journal)) {
    throw errors.permisionDenied()
  }

  if (reviewOwner.rankEvents.filter(
    rankEvent =>
      rankEvent.category === 'ReviewVotes' &&
      rankEvent.articleId === articleId &&
      rankEvent.voterId === voter.userId
  ).length !== 0) {
    throw errors.reviewAlreadyRated()
  }

  const payload = {
    voterId: voter.userId,
    reviewOwnerId: reviewOwner.userId,
    articleId,
    journalId: journal.journalId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ReviewUpvotedWithGold', payload }]
      case 'silver':
        return [{ type: 'ReviewUpvotedWithSilver', payload }]
      case 'bronze':
        return [{ type: 'ReviewUpvotedWithBronze', payload }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ReviewDownvotedWithGold', payload }]
      case 'silver':
        return [{ type: 'ReviewDownvotedWithSilver', payload }]
      case 'bronze':
        return [{ type: 'ReviewDownvotedWithBronze', payload }]
    }
  }
}

import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function rateUser (params: {
  voter: t.User
  user: t.User
  medal: t.Medal
  rating: t.Rating
  timestamp: t.Timestamp
}): t.UserEvent[] {
  const { voter, user, medal, rating, timestamp } = params

  if (!privileges[`canRateUserWith${medal}`](voter)) {
    throw errors.permisionDenied()
  }

  if (user.rankEvents.filter(
    rankEvent =>
      rankEvent.category === 'UserEvents' &&
      rankEvent.voterId === voter.userId
  ).length !== 0) {
    throw errors.userAlreadyRated()
  }

  const payload = {
    voterId: voter.userId,
    userId: user.userId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'UserUpvotedWithGold', payload }]
      case 'silver':
        return [{ type: 'UserUpvotedWithSilver', payload }]
      case 'bronze':
        return [{ type: 'UserUpvotedWithBronze', payload }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'UserDownvotedWithGold', payload }]
      case 'silver':
        return [{ type: 'UserDownvotedWithSilver', payload }]
      case 'bronze':
        return [{ type: 'UserDownvotedWithBronze', payload }]
    }
  }
}

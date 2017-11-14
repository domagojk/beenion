import * as t from '../../../types'
import privileges from '../../privileges'
import errors from '../../errors'

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

  const eventBody = {
    voterId: voter.userId,
    userId: user.userId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'UserUpvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'UserUpvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'UserUpvotedWithBronze', ...eventBody }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'UserDownvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'UserDownvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'UserDownvotedWithBronze', ...eventBody }]
    }
  }
}

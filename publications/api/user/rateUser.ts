import { UserEvent } from 'domain/types/events'
import { canRateUser } from 'domain/businessRules'
import { RATING_USER_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createMedal,
  createRating,
  createTimestamp
} from 'domain/typeFactories'

function rateUser (command: {
  voterHistory: object[]
  userHistory: object[]
  medal: string
  rating: string
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const userHistory = createUserHistory(command.userHistory)
  const medal = createMedal(command.medal)
  const rating = createRating(command.rating)
  const timestamp = createTimestamp(command.timestamp)

  const voter = reduceToUser(voterHistory)
  const user = reduceToUser(userHistory)

  if (!canRateUser(voter, user, medal)) {
    throw new Error(RATING_USER_NOT_ALLOWED)
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

export default rateUser

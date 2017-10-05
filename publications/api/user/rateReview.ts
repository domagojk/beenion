import { UserEvent } from 'domain/types/events'
import { canRateReview } from 'domain/businessRules'
import { RATING_REVIEW_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationHistory,
  createProjectId,
  createMedal,
  createRating,
  createTimestamp
} from 'domain/typeFactories'

function rateReview (command: {
  voterHistory: object[]
  reviewerHistory: object[]
  publicationHistory: object[]
  projectId: string
  medal: string
  rating: string
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const reviewerHistory = createUserHistory(command.reviewerHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const projectId = createProjectId(command.projectId)
  const medal = createMedal(command.medal)
  const rating = createRating(command.rating)
  const timestamp = createTimestamp(command.timestamp)

  const publication = reduceToPublication(publicationHistory)
  const voter = reduceToUser(voterHistory)
  const reviewer = reduceToUser(reviewerHistory)

  if (
    !canRateReview(
      voter,
      reviewer,
      projectId,
      publication,
      medal
    )
  ) {
    throw new Error(RATING_REVIEW_NOT_ALLOWED)
  }

  const eventBody = {
    voterId: voter.userId,
    userId: reviewer.userId,
    projectId,
    publicationId: publication.publicationId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ReviewUpvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ReviewUpvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ReviewUpvotedWithBronze', ...eventBody }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ReviewDownvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ReviewDownvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ReviewDownvotedWithBronze', ...eventBody }]
    }
  }
}

export default rateReview

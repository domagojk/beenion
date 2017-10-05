import { UserEvent } from 'domain/types/events'
import { canRateProject } from 'domain/businessRules'
import { RATING_PROJECT_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import reduceToProject from 'domain/reduceToProject'
import {
  createUserHistory,
  createPublicationHistory,
  createProjectHistory,
  createMedal,
  createRating,
  createTimestamp
} from 'domain/typeFactories'

function rateProject (command: {
  voterHistory: object[]
  projectOwnerHistory: object[]
  publicationHistory: object[]
  projectHistory: object[]
  medal: string
  rating: string
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const projectOwnerHistory = createUserHistory(command.projectOwnerHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const projectHistory = createProjectHistory(command.projectHistory)
  const medal = createMedal(command.medal)
  const rating = createRating(command.rating)
  const timestamp = createTimestamp(command.timestamp)

  const publication = reduceToPublication(publicationHistory)
  const project = reduceToProject(projectHistory)
  const voter = reduceToUser(voterHistory)
  const projectOwner = reduceToUser(projectOwnerHistory)

  if (
    !canRateProject(
      voter,
      projectOwner,
      project.projectId,
      publication,
      medal
    )
  ) {
    throw new Error(RATING_PROJECT_NOT_ALLOWED)
  }

  const eventBody = {
    voterId: voter.userId,
    userId: project.ownerId,
    projectId: project.projectId,
    publicationId: publication.publicationId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ProjectUpvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ProjectUpvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ProjectUpvotedWithBronze', ...eventBody }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ProjectDownvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ProjectDownvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ProjectDownvotedWithBronze', ...eventBody }]
    }
  }
}

export default rateProject

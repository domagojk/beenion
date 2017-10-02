import { ProjectEvent } from 'domain/types/events'
import { canRemoveReviewer } from 'domain/businessRules'
import { PROJECT_REMOVE_REVIEWER_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToProject from 'domain/reduceToProject'
import {
  createUserId,
  createProjectHistory,
  createTimestamp
} from 'domain/typeFactories'

function removeProjectReviewer (command: {
  reviewerId: string,
  projectHistory: object[]
  timestamp: number
}): ProjectEvent[] {

  const reviewerId = createUserId(command.reviewerId)
  const projectHistory = createProjectHistory(command.projectHistory)
  const timestamp = createTimestamp(command.timestamp)

  const project = reduceToProject(projectHistory)

  if (canRemoveReviewer(reviewerId, project)) {
    throw new Error(PROJECT_REMOVE_REVIEWER_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectReviewerRemoved',
      projectId: project.projectId,
      reviewerId,
      timestamp
    }
  ]
}

export default removeProjectReviewer

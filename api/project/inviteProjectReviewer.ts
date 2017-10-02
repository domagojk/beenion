import { ProjectEvent } from 'domain/types/events'
import { canAddReviewer } from 'domain/businessRules'
import { PROJECT_ADD_REVIEWER_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import reduceToProject from 'domain/reduceToProject'
import {
  createUserHistory,
  createPublicationHistory,
  createProjectHistory,
  createTimestamp
} from 'domain/typeFactories'

function inviteProjectReviewer (command: {
  reviewerHistory: object[]
  publicationHistory: object[]
  projectHistory: object[]
  timestamp: number
}): ProjectEvent[] {

  const reviewerHistory = createUserHistory(command.reviewerHistory)
  const projectHistory = createProjectHistory(command.projectHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const publication = reduceToPublication(publicationHistory)
  const reviewer = reduceToUser(reviewerHistory)
  const project = reduceToProject(projectHistory)

  if (!canAddReviewer(reviewer, project, publication)) {
    throw new Error(PROJECT_ADD_REVIEWER_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectReviewerInvited',
      projectId: project.projectId,
      reviewerId: reviewer.userId,
      timestamp
    }
  ]
}

export default inviteProjectReviewer

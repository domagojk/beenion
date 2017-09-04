import { Timestamp, UUID } from 'domain/types/model'
import { ProjectEvent } from 'domain/types/events'
import makeProject from 'domain/projections/makeProject'
import { canRemoveReviewer } from 'domain/invariants/permissions'
import * as validate from 'domain/invariants/typeValidation'
import * as errorCodes from 'domain/invariants/errorCodes'

function removeProjectReviewer (command: {
  reviewerId: UUID,
  projectHistory: ProjectEvent[]
  timestamp: Timestamp
}): ProjectEvent[] {

  if (!validate.isProjectHistory(command.projectHistory)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_HISTORY)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const project = makeProject(command.projectHistory)

  if (canRemoveReviewer(command.reviewerId, project)) {
    throw new Error(errorCodes.REMOVE_REVIEWER_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectReviewerRemoved',
      projectId: project.projectId,
      reviewerId: command.reviewerId,
      timestamp: command.timestamp
    }
  ]
}

export default removeProjectReviewer

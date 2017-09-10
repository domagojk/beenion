import { Timestamp } from 'domain/types/model'
import { UserEvent, PublicationEvent, ProjectEvent } from 'domain/types/events'
import makeUser from 'domain/makeUser'
import makePublication from 'domain/makePublication'
import makeProject from 'domain/makeProject'
import { canInviteReviewer } from 'domain/permissions'
import * as validate from 'domain/typeValidation'
import * as errorCodes from 'domain/errorCodes'

function inviteProjectReviewer (command: {
  reviewerHistory: UserEvent[]
  publicationHistory: PublicationEvent[]
  projectHistory: ProjectEvent[]
  timestamp: Timestamp
}): ProjectEvent[] {

  if (!validate.isUserHistory(command.reviewerHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isProjectHistory(command.projectHistory)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_HISTORY)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const publication = makePublication(command.publicationHistory)
  const reviewer = makeUser(command.reviewerHistory)
  const project = makeProject(command.projectHistory)

  if (canInviteReviewer(reviewer, project, publication)) {
    return [
      {
        type: 'ProjectReviewerInvited',
        projectId: project.projectId,
        reviewerId: reviewer.userId,
        timestamp: command.timestamp
      }
    ]
  }

  return [
    {
      type: 'ProjectReviewerInviteFailed',
      projectId: project.projectId,
      reviewerId: reviewer.userId,
      timestamp: command.timestamp
    }
  ]
}

export default inviteProjectReviewer

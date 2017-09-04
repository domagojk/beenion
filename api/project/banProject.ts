import { Timestamp } from 'domain/types/model'
import { UserEvent, PublicationEvent, ProjectEvent } from 'domain/types/events'
import makeUser from 'domain/projections/makeUser'
import makePublication from 'domain/projections/makePublication'
import makeProject from 'domain/projections/makeProject'
import { canBanProject } from 'domain/invariants/permissions'
import * as validate from 'domain/invariants/typeValidation'
import * as errorCodes from 'domain/invariants/errorCodes'

function banProject (command: {
  userHistory: UserEvent[]
  publicationHistory: PublicationEvent[]
  projectHistory: ProjectEvent[]
  timestamp: Timestamp
}): ProjectEvent[] {

  if (!validate.isUserHistory(command.userHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isProjectHistory(command.projectHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const project = makeProject(command.projectHistory)
  const publication = makePublication(command.publicationHistory)
  const user = makeUser(command.userHistory)

  if (!canBanProject(user, project, publication)) {
    throw new Error(errorCodes.BAN_PROJECT_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectBanned',
      projectId: project.projectId,
      userId: user.userId,
      timestamp: command.timestamp
    }
  ]
}

export default banProject

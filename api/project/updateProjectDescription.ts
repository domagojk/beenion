import { Timestamp, Description } from 'domain/types/model'
import { UserEvent, PublicationEvent, ProjectEvent } from 'domain/types/events'
import makeUser from 'domain/projections/makeUser'
import makePublication from 'domain/projections/makePublication'
import makeProject from 'domain/projections/makeProject'
import { canUpdateProject } from 'domain/invariants/permissions'
import * as validate from 'domain/invariants/typeValidation'
import * as errorCodes from 'domain/invariants/errorCodes'

function updateProjectDescription (command: {
  userHistory: UserEvent[]
  publicationHistory: PublicationEvent[]
  projectHistory: ProjectEvent[]
  description: Description,
  timestamp: Timestamp
}): ProjectEvent[] {

  if (!validate.isUserHistory(command.userHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isProjectHistory(command.projectHistory)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_HISTORY)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isDescription(command.description)) {
    throw new TypeError(errorCodes.INVALID_DESCRIPTION)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const project = makeProject(command.projectHistory)
  const publication = makePublication(command.publicationHistory)
  const user = makeUser(command.userHistory)

  if (!canUpdateProject(user, project, publication)) {
    throw new Error(errorCodes.UPDATE_PROJECT_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectDescriptionUpdated',
      projectId: project.projectId,
      description: command.description,
      timestamp: command.timestamp
    }
  ]
}

export default updateProjectDescription

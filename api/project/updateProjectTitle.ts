import { Timestamp, Title } from 'domain/types/model'
import { UserEvent, PublicationEvent, ProjectEvent } from 'domain/types/events'
import makeUser from 'domain/projections/makeUser'
import makePublication from 'domain/projections/makePublication'
import makeProject from 'domain/projections/makeProject'
import { canUpdateProject } from 'domain/invariants/permissions'
import * as validate from 'domain/invariants/typeValidation'
import * as errorCodes from 'domain/invariants/errorCodes'

function updateProjectTitle (command: {
  userHistory: UserEvent[]
  publicationHistory: PublicationEvent[]
  projectHistory: ProjectEvent[]
  title: Title,
  timestamp: Timestamp
}): ProjectEvent[] {

  if (!validate.isUserHistory(command.userHistory)) {
    throw new Error(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isProjectHistory(command.projectHistory)) {
    throw new Error(errorCodes.INVALID_PROJECT_HISTORY)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new Error(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isTitle(command.title)) {
    throw new Error(errorCodes.INVALID_TITLE)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new Error(errorCodes.INVALID_TIMESTAMP)
  }

  const project = makeProject(command.projectHistory)
  const publication = makePublication(command.publicationHistory)
  const user = makeUser(command.userHistory)

  if (!canUpdateProject(user, project, publication)) {
    throw new Error((errorCodes.UPDATE_PROJECT_NOT_ALLOWED))
  }

  return [
    {
      type: 'ProjectTitleUpdated',
      projectId: project.projectId,
      title: command.title,
      timestamp: command.timestamp
    }
  ]
}

export default updateProjectTitle

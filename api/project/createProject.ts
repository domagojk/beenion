import { UUID, Description, Timestamp, Title, URL } from 'domain/types/model'
import { UserEvent, PublicationEvent, ProjectEvent } from 'domain/types/events'
import makeUser from 'domain/projections/makeUser'
import makePublication from 'domain/projections/makePublication'
import { canCreateProject } from 'domain/invariants/permissions'
import * as validate from 'domain/invariants/typeValidation'
import * as errorCodes from 'domain/invariants/errorCodes'

function createProject (command: {
  userHistory: UserEvent[]
  publicationHistory: PublicationEvent[]
  projectId: UUID
  title: Title
  description: Description
  link: URL
  timestamp: Timestamp
}): ProjectEvent[] {

  if (!validate.isUserHistory(command.userHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isUUID(command.projectId)) {
    throw new TypeError(errorCodes.INVALID_UUID)
  }

  if (!validate.isTitle(command.title)) {
    throw new TypeError(errorCodes.INVALID_TITLE)
  }

  if (!validate.isDescription(command.description)) {
    throw new TypeError(errorCodes.INVALID_DESCRIPTION)
  }

  if (!validate.isURL(command.link)) {
    throw new TypeError(errorCodes.INVALID_URL)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const publication = makePublication(command.publicationHistory)
  const user = makeUser(command.userHistory)

  if (!canCreateProject(user, publication)) {
    throw new Error(errorCodes.CREATE_PROJECT_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectCreated',
      ownerId: user.userId,
      publicationId: publication.publicationId,
      projectId: command.projectId,
      title: command.title,
      description: command.description,
      link: command.link,
      stageRules: publication.projectStageRules,
      timestamp: command.timestamp
    }
  ]
}

export default createProject

import {
  UUID,
  Description,
  Title,
  Timestamp,
  PublicationPrivileges,
  RankConditions,
  ProjectStageRules
} from 'domain/types/model'
import { UserEvent, PublicationEvent } from 'domain/types/events'
import makeUser from 'domain/makeUser'
import * as permissions from 'domain/permissions'
import * as validate from 'domain/typeValidation'
import * as errorCodes from 'domain/errorCodes'

function createPublication (command: {
  userHistory: UserEvent[]
  publicationId: UUID
  privileges: PublicationPrivileges
  rankConditions: RankConditions
  projectStageRules: ProjectStageRules[]
  title: Title
  description: Description
  timestamp: Timestamp
}): PublicationEvent[] {

  if (!validate.isUserHistory(command.userHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isUUID(command.publicationId)) {
    throw new TypeError(errorCodes.INVALID_UUID)
  }

  if (!validate.isTitle(command.title)) {
    throw new TypeError(errorCodes.INVALID_TITLE)
  }

  if (!validate.isDescription(command.description)) {
    throw new TypeError(errorCodes.INVALID_DESCRIPTION)
  }

  if (!validate.isPublicationPrivileges(command.privileges)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_PRIVILEGES)
  }

  if (!validate.isRankConditions(command.rankConditions)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_RANK_CONDITIONS)
  }

  if (!validate.isProjectStageRules(command.projectStageRules)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_STAGE_RULES)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const user = makeUser(command.userHistory)

  if (!permissions.canCreatePublication(user)) {
    throw new Error(errorCodes.CREATE_PUBLICATION_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationCreated',
      publicationId: command.publicationId,
      ownerId: user.userId,
      title: command.title,
      description: command.description,
      privileges: command.privileges,
      rankConditions: command.rankConditions,
      projectStageRules: command.projectStageRules,
      timestamp: command.timestamp
    }
  ]
}

export default createPublication

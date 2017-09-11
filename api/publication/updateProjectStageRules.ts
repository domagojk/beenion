import { ProjectStageRules, Timestamp } from 'domain/types/model'
import { UserEvent, PublicationEvent } from 'domain/types/events'
import makeUser from 'domain/makeUser'
import makePublication from 'domain/makePublication'
import { canUpdatePublication } from 'domain/permissions'
import * as validate from 'domain/typeValidation'
import * as errorCodes from 'domain/errorCodes'

function updateProjectStageRules (command: {
  userHistory: UserEvent[]
  publicationHistory: PublicationEvent[]
  projectStageRules: ProjectStageRules[]
  timestamp: Timestamp
}): PublicationEvent[] {
  if (!validate.isUserHistory(command.userHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isProjectStageRules(command.projectStageRules)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_STAGE_RULES)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const user = makeUser(command.userHistory)
  const publication = makePublication(command.publicationHistory)

  if (!canUpdatePublication(user, publication)) {
    throw new Error(errorCodes.UPDATE_PUBLICATION_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectStageRulesUpdated',
      publicationId: publication.publicationId,
      projectStageRules: command.projectStageRules,
      timestamp: command.timestamp
    }
  ]
}

export default updateProjectStageRules

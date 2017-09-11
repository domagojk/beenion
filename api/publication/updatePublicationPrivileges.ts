import { PublicationPrivileges, Timestamp } from 'domain/types/model'
import { UserEvent, PublicationEvent } from 'domain/types/events'
import makeUser from 'domain/makeUser'
import makePublication from 'domain/makePublication'
import { canUpdatePublication } from 'domain/permissions'
import * as validate from 'domain/typeValidation'
import * as errorCodes from 'domain/errorCodes'

function updatePublicationPrivileges (command: {
  userHistory: UserEvent[]
  publicationHistory: PublicationEvent[]
  publicationPrivileges: PublicationPrivileges
  timestamp: Timestamp
}): PublicationEvent[] {
  if (!validate.isUserHistory(command.userHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  if (!validate.isPublicationPrivileges(command.publicationPrivileges)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_PRIVILEGES)
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
      type: 'PublicationPrivilegesUpdated',
      publicationId: publication.publicationId,
      privileges: command.publicationPrivileges,
      timestamp: command.timestamp
    }
  ]
}

export default updatePublicationPrivileges

import { Timestamp, UUID } from 'domain/types/model'
import { UserEvent, PublicationEvent } from 'domain/types/events'
import makeUser from 'domain/projections/makeUser'
import makePublication from 'domain/projections/makePublication'
import { canDeletePublication } from 'domain/invariants/permissions'
import * as validate from 'domain/invariants/typeValidation'
import * as errorCodes from 'domain/invariants/errorCodes'

function deletePublication (command: {
  userHistory: UserEvent[],
  publicationHistory: PublicationEvent[],
  publicationId: UUID,
  timestamp: Timestamp
}): PublicationEvent[] {

  if (!validate.isUserHistory(command.userHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  if (!validate.isPublicationHistory(command.publicationHistory)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }

  const user = makeUser(command.userHistory)
  const publication = makePublication(command.publicationHistory)

  if (!canDeletePublication(user, publication)) {
    throw new Error(errorCodes.DELETE_PUBLICATION_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationDeleted',
      userId: user.userId,
      publicationId: command.publicationId,
      timestamp: command.timestamp
    }
  ]
}

export default deletePublication

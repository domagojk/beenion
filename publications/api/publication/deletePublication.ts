import { PublicationEvent } from 'domain/types/events'
import { canDeletePublication } from 'domain/businessRules'
import { PUBLICATION_DELETE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationHistory,
  createTimestamp
} from 'domain/typeFactories'

function deletePublication (command: {
  userHistory: object[]
  publicationHistory: object[]
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canDeletePublication(user, publication)) {
    throw new Error(PUBLICATION_DELETE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationDeleted',
      userId: user.userId,
      publicationId: publication.publicationId,
      timestamp
    }
  ]
}

export default deletePublication

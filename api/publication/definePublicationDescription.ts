import { PublicationEvent } from 'domain/types/events'
import { canUpdatePublication } from 'domain/businessRules'
import { PUBLICATION_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationHistory,
  createDescription,
  createTimestamp
} from 'domain/typeFactories'

function definePublicationDescription (command: {
  userHistory: object[]
  publicationHistory: object[]
  description: string
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const description = createDescription(command.description)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canUpdatePublication(user, publication)) {
    throw new Error(PUBLICATION_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationDescriptionDefined',
      publicationId: publication.publicationId,
      description,
      timestamp
    }
  ]
}

export default definePublicationDescription

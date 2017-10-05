import { PublicationEvent } from 'domain/types/events'
import { canUpdatePublication } from 'domain/businessRules'
import { PUBLICATION_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationHistory,
  createTitle,
  createTimestamp
} from 'domain/typeFactories'

function definePublicationTitle (command: {
  userHistory: object[]
  publicationHistory: object[]
  title: string
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const title = createTitle(command.title)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canUpdatePublication(user, publication)) {
    throw new Error(PUBLICATION_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationTitleDefined',
      publicationId: publication.publicationId,
      title,
      timestamp
    }
  ]
}

export default definePublicationTitle

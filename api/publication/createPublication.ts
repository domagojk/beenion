import { PublicationEvent } from 'domain/types/events'
import { canCreatePublication } from 'domain/businessRules'
import { PUBLICATION_CREATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createPublicationId,
  createTitle,
  createDescription,
  createTimestamp
} from 'domain/typeFactories'

function createPublication (command: {
  userHistory: object[]
  publicationId: string
  title: string
  description: string
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const publicationId = createPublicationId(command.publicationId)
  const title = createTitle(command.title)
  const description = createDescription(command.description)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)

  if (!canCreatePublication(user)) {
    throw new Error(PUBLICATION_CREATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationCreated',
      publicationId,
      ownerId: user.userId,
      timestamp
    },
    {
      type: 'PublicationTitleDefined',
      publicationId,
      title,
      timestamp
    },
    {
      type: 'PublicationDescriptionDefined',
      publicationId,
      description,
      timestamp
    },
    {
      type: 'PublicationPrivilegeDefined',
      publicationId,
      privilege: 'canUpdatePublication',
      permission: {
        users: [user.userId]
      },
      timestamp
    }
  ]
}

export default createPublication

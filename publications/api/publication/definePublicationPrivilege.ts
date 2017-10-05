import { PublicationEvent } from 'domain/types/events'
import { canUpdatePublicationPrivilege } from 'domain/businessRules'
import { PUBLICATION_PRIVILEGE_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationPrivilege,
  createPublicationPermission,
  createPublicationHistory,
  createTimestamp
} from 'domain/typeFactories'

function definePublicationPrivilege (command: {
  userHistory: object[]
  publicationHistory: object[]
  privilege: string,
  permission: string,
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const privilege = createPublicationPrivilege(command.privilege)
  const permission = createPublicationPermission(command.permission)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canUpdatePublicationPrivilege(user, publication)) {
    throw new Error(PUBLICATION_PRIVILEGE_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationPrivilegeDefined',
      publicationId: publication.publicationId,
      privilege,
      permission,
      timestamp
    }
  ]
}

export default definePublicationPrivilege

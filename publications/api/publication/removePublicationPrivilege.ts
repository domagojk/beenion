import { PublicationEvent } from 'domain/types/events'
import { canUpdatePublicationPrivilege } from 'domain/businessRules'
import { PUBLICATION_PRIVILEGE_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationPrivilege,
  createPublicationHistory,
  createTimestamp
} from 'domain/typeFactories'

function removePublicationPermission (command: {
  userHistory: object[]
  publicationHistory: object[]
  privilege: string,
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const privilege = createPublicationPrivilege(command.privilege)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canUpdatePublicationPrivilege(user, publication)) {
    throw new Error(PUBLICATION_PRIVILEGE_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationPrivilegeRemoved',
      publicationId: publication.publicationId,
      privilege,
      timestamp
    }
  ]
}

export default removePublicationPermission

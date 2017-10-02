import { PublicationEvent } from 'domain/types/events'
import { canAddPublicationEditor } from 'domain/businessRules'
import { PUBLICATION_ADD_EDITOR_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createUserId,
  createPublicationHistory,
  createTimestamp
} from 'domain/typeFactories'

function addPublicationEditor (command: {
  userHistory: object[]
  publicationHistory: object[]
  editorId: string,
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const editorId = createUserId(command.editorId)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canAddPublicationEditor(editorId, user, publication)) {
    throw new Error(PUBLICATION_ADD_EDITOR_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationEditorAdded',
      publicationId: publication.publicationId,
      userId: user.userId,
      editorId,
      timestamp
    }
  ]
}

export default addPublicationEditor

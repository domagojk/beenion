import { PublicationEvent } from 'domain/types/events'
import { canConfirmPublicationEditor } from 'domain/businessRules'
import { PUBLICATION_CONFIRM_EDITOR_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createUserId,
  createPublicationHistory,
  createTimestamp
} from 'domain/typeFactories'

function confirmPublicationEditor (command: {
  editorHistory: object[]
  publicationHistory: object[]
  invitedEditorId: string,
  timestamp: number
}): PublicationEvent[] {

  const editorHistory = createUserHistory(command.editorHistory)
  const invitedEditorId = createUserId(command.invitedEditorId)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const editor = reduceToUser(editorHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canConfirmPublicationEditor(invitedEditorId, publication)) {
    throw new Error(PUBLICATION_CONFIRM_EDITOR_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationEditorConfirmed',
      publicationId: publication.publicationId,
      editorId: invitedEditorId,
      confirmedEditorId: editor.userId,
      timestamp
    }
  ]
}

export default confirmPublicationEditor

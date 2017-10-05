import { UserEvent } from 'domain/types/events'
import {
  createUserId,
  createProjectId,
  createPublicationId,
  createTimestamp
} from 'domain/typeFactories'

function declineReviewInvitation (command: {
  userId: string
  projectId: string
  publicationId: string
  timestamp: number
}): UserEvent[] {

  const userId = createUserId(command.userId)
  const projectId = createProjectId(command.projectId)
  const publicationId = createPublicationId(command.publicationId)
  const timestamp = createTimestamp(command.timestamp)

  return [
    {
      type: 'ReviewInvitationDeclined',
      userId,
      projectId,
      publicationId,
      timestamp
    }
  ]
}

export default declineReviewInvitation

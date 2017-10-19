import { UserEvent } from 'domain/types/events'
import {
  createUserId,
  createArticleId,
  createJornalId,
  createTimestamp
} from 'domain/typeFactories'

function declineReviewInvitation (command: {
  userId: string
  articleId: string
  journalId: string
  timestamp: number
}): UserEvent[] {

  const userId = createUserId(command.userId)
  const articleId = createArticleId(command.articleId)
  const journalId = createJornalId(command.journalId)
  const timestamp = createTimestamp(command.timestamp)

  return [
    {
      type: 'ReviewInvitationDeclined',
      userId,
      articleId,
      journalId,
      timestamp
    }
  ]
}

export default declineReviewInvitation

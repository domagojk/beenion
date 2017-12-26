import * as t from '../../../types'

export function declineReviewInvitation (params: {
  reviewOwnerId: t.UserId
  articleId: t.ArticleId
  journalId: t.JournalId
  timestamp: t.Timestamp
}): t.UserEvent[] {
  const { reviewOwnerId, articleId, journalId, timestamp } = params

  return [
    {
      type: 'ReviewInvitationDeclined',
      payload: {
        reviewOwnerId,
        articleId,
        journalId,
        timestamp
      }
    }
  ]
}

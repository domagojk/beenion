import * as t from '../../../types'

export function expireReviewInvitation (params: {
  reviewOwnerId: t.UserId
  articleId: t.ArticleId
  journalId: t.JournalId
  timestamp: t.Timestamp
}): t.UserEvent[] {
  const { reviewOwnerId, articleId, journalId, timestamp } = params

  return [
    {
      type: 'ReviewInvitationExpired',
      reviewOwnerId,
      articleId,
      journalId,
      timestamp
    }
  ]
}

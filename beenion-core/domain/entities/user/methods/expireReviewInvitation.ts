import * as t from '../../../types'

export function expireReviewInvitation (params: {
  reviewOwnerId: t.UserId
  articleId: t.ArticleId
  newsletterId: t.newsletterId
  timestamp: t.Timestamp
}): t.UserEvent[] {
  const { reviewOwnerId, articleId, newsletterId, timestamp } = params

  return [
    {
      type: 'ReviewInvitationExpired',
      payload: {
        reviewOwnerId,
        articleId,
        newsletterId,
        timestamp
      }
    }
  ]
}

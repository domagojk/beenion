import * as t from '../../../types'

export function declineReviewInvitation (params: {
  reviewOwnerId: t.UserId
  articleId: t.ArticleId
  newsletterId: t.newsletterId
  timestamp: t.Timestamp
}): t.UserEvent[] {
  const { reviewOwnerId, articleId, newsletterId, timestamp } = params

  return [
    {
      type: 'ReviewInvitationDeclined',
      payload: {
        reviewOwnerId,
        articleId,
        newsletterId,
        timestamp
      }
    }
  ]
}

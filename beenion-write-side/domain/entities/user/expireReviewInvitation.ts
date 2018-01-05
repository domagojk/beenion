import * as t from '../../types'

export function expireReviewInvitation (
  reviewOwnerId: t.UserId,
  articleId: t.ArticleId,
  newsletterId: t.NewsletterId,
  timestamp: t.Timestamp
): t.UserEvent[] {

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

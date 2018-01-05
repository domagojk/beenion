import * as t from '../../types'

export function declineReviewInvitation (
  reviewOwnerId: t.UserId,
  articleId: t.ArticleId,
  newsletterId: t.NewsletterId,
  timestamp: t.Timestamp
): t.UserEvent[] {

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

import * as t from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function rateArticle (
  voter: t.User,
  articleId: t.ArticleId,
  articleOwner: t.User,
  newsletter: t.Newsletter,
  medal: t.Medal,
  rating: t.Rating,
  timestamp: t.Timestamp
): t.UserEvent[] {

  if (!privileges[`canRateArticleWith${medal}`](voter, newsletter)) {
    throw errors.permisionDenied()
  }

  if (articleOwner.rankEvents.filter(
    rankEvent =>
      rankEvent.category === 'ArticleVotes' &&
      rankEvent.articleId === articleId &&
      rankEvent.voterId === voter.userId
  ).length !== 0) {
    throw errors.articleAlreadyRated()
  }

  const payload = {
    voterId: voter.userId,
    articleOwnerId: articleOwner.userId,
    newsletterId: newsletter.newsletterId,
    articleId: articleId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ArticleUpvotedWithGold', payload }]
      case 'silver':
        return [{ type: 'ArticleUpvotedWithSilver', payload }]
      case 'bronze':
        return [{ type: 'ArticleUpvotedWithBronze', payload }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ArticleDownvotedWithGold', payload }]
      case 'silver':
        return [{ type: 'ArticleDownvotedWithSilver', payload }]
      case 'bronze':
        return [{ type: 'ArticleDownvotedWithBronze', payload }]
    }
  }
}

import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function rateArticle (params: {
  voter: t.User
  articleId: t.ArticleId
  articleOwner: t.User
  journal: t.Journal
  medal: t.Medal
  rating: t.Rating
  timestamp: t.Timestamp
}): t.UserEvent[] {
  const { voter, articleOwner, journal, articleId, medal, rating, timestamp } = params

  if (!privileges[`canRateArticleWith${medal}`](voter, journal)) {
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
    journalId: journal.journalId,
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

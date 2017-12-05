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

  const eventBody = {
    voterId: voter.userId,
    articleOwnerId: articleOwner.userId,
    journalId: journal.journalId,
    articleId: articleId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ArticleUpvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ArticleUpvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ArticleUpvotedWithBronze', ...eventBody }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ArticleDownvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ArticleDownvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ArticleDownvotedWithBronze', ...eventBody }]
    }
  }
}

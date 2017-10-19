import { UserEvent } from 'domain/types/events'
import { canRateArticle } from 'domain/businessRules'
import { RATING_ARTICLE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import reduceToArticle from 'domain/reduceToArticle'
import {
  createUserHistory,
  createArticleHistory,
  createJournalHistory,
  createMedal,
  createRating,
  createTimestamp
} from 'domain/typeFactories'

function rateArticle (command: {
  voterHistory: object[]
  articleOwnerHistory: object[]
  journalHistory: object[]
  articleHistory: object[]
  medal: string
  rating: string
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const articleOwnerHistory = createUserHistory(command.articleOwnerHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const articleHistory = createArticleHistory(command.articleHistory)
  const medal = createMedal(command.medal)
  const rating = createRating(command.rating)
  const timestamp = createTimestamp(command.timestamp)

  const journal = reduceToJournal(journalHistory)
  const article = reduceToArticle(articleHistory)
  const voter = reduceToUser(voterHistory)
  const articleOwner = reduceToUser(articleOwnerHistory)

  if (
    !canRateArticle(
      voter,
      articleOwner,
      article.articleId,
      journal,
      medal
    )
  ) {
    throw new Error(RATING_ARTICLE_NOT_ALLOWED)
  }

  const eventBody = {
    voterId: voter.userId,
    userId: article.ownerId,
    articleId: article.articleId,
    journalId: journal.journalId,
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

export default rateArticle

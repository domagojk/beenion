import { UserEvent } from 'domain/types/events'
import { canRateReview } from 'domain/businessRules'
import { RATING_REVIEW_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createArticleId,
  createMedal,
  createRating,
  createTimestamp
} from 'domain/typeFactories'

function rateReview (command: {
  voterHistory: object[]
  reviewerHistory: object[]
  journalHistory: object[]
  articleId: string
  medal: string
  rating: string
  timestamp: number
}): UserEvent[] {

  const voterHistory = createUserHistory(command.voterHistory)
  const reviewerHistory = createUserHistory(command.reviewerHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const articleId = createArticleId(command.articleId)
  const medal = createMedal(command.medal)
  const rating = createRating(command.rating)
  const timestamp = createTimestamp(command.timestamp)

  const journal = reduceToJournal(journalHistory)
  const voter = reduceToUser(voterHistory)
  const reviewer = reduceToUser(reviewerHistory)

  if (
    !canRateReview(
      voter,
      reviewer,
      articleId,
      journal,
      medal
    )
  ) {
    throw new Error(RATING_REVIEW_NOT_ALLOWED)
  }

  const eventBody = {
    voterId: voter.userId,
    userId: reviewer.userId,
    articleId,
    journalId: journal.journalId,
    timestamp
  }

  if (rating === 'upvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ReviewUpvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ReviewUpvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ReviewUpvotedWithBronze', ...eventBody }]
    }
  }
  if (rating === 'downvote') {
    switch (medal) {
      case 'gold':
        return [{ type: 'ReviewDownvotedWithGold', ...eventBody }]
      case 'silver':
        return [{ type: 'ReviewDownvotedWithSilver', ...eventBody }]
      case 'bronze':
        return [{ type: 'ReviewDownvotedWithBronze', ...eventBody }]
    }
  }
}

export default rateReview

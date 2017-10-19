import { ArticleEvent } from 'domain/types/events'
import { canAddReviewer } from 'domain/businessRules'
import { ARTICLE_ADD_REVIEWER_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import reduceToArticle from 'domain/reduceToArticle'
import {
  createUserHistory,
  createArticleHistory,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function inviteArticleReviewer (command: {
  reviewerHistory: object[]
  journalHistory: object[]
  articleHistory: object[]
  timestamp: number
}): ArticleEvent[] {

  const reviewerHistory = createUserHistory(command.reviewerHistory)
  const articleHistory = createArticleHistory(command.articleHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const journal = reduceToJournal(journalHistory)
  const reviewer = reduceToUser(reviewerHistory)
  const article = reduceToArticle(articleHistory)

  if (!canAddReviewer(reviewer, article, journal)) {
    throw new Error(ARTICLE_ADD_REVIEWER_NOT_ALLOWED)
  }

  return [
    {
      type: 'ArticleReviewerInvited',
      articleId: article.articleId,
      reviewerId: reviewer.userId,
      timestamp
    }
  ]
}

export default inviteArticleReviewer

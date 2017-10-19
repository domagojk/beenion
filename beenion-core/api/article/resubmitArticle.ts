import { ArticleEvent } from 'domain/types/events'
import { canResubmitArticle } from 'domain/businessRules'
import { ARTICLE_RESUBMIT_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import reduceToArticle from 'domain/reduceToArticle'
import {
  createUserHistory,
  createArticleHistory,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function resubmitArticle (command: {
  userHistory: object[]
  journalHistory: object[]
  articleHistory: object[]
  timestamp: number
}): ArticleEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const articleHistory = createArticleHistory(command.articleHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const article = reduceToArticle(articleHistory)
  const journal = reduceToJournal(journalHistory)
  const user = reduceToUser(userHistory)

  if (!canResubmitArticle(user, article, journal)) {
    throw new Error(ARTICLE_RESUBMIT_NOT_ALLOWED)
  }

  return [
    {
      type: 'ArticleResubmitted',
      articleId: article.articleId,
      timestamp
    }
  ]
}

export default resubmitArticle

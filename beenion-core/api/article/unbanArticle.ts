import { ArticleEvent } from 'domain/types/events'
import { canBanArticle } from 'domain/businessRules'
import { ARTICLE_UNBAN_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import reduceToArticle from 'domain/reduceToArticle'
import {
  createUserHistory,
  createArticleHistory,
  createJournalHistory,
  createTimestamp
} from 'domain/typeFactories'

function unbanArticle (command: {
  userHistory: object[]
  journalHistory: object[]
  articleHistory: object[]
  timestamp: number
}): ArticleEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const articleHistory = createArticleHistory(command.articleHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const article = reduceToArticle(articleHistory)
  const journal = reduceToJournal(journalHistory)

  if (!canBanArticle(user, article, journal)) {
    throw new Error(ARTICLE_UNBAN_NOT_ALLOWED)
  }

  return [
    {
      type: 'ArticleUnbanned',
      articleId: article.articleId,
      userId: user.userId,
      timestamp
    }
  ]
}

export default unbanArticle

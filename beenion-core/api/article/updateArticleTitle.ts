import { ArticleEvent } from 'domain/types/events'
import { canUpdateArticle } from 'domain/businessRules'
import { ARTICLE_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import reduceToArticle from 'domain/reduceToArticle'
import {
  createUserHistory,
  createArticleHistory,
  createJournalHistory,
  createTitle,
  createTimestamp
} from 'domain/typeFactories'

function updateArticleTitle (command: {
  userHistory: object[]
  journalHistory: object[]
  articleHistory: object[]
  title: string,
  timestamp: number
}): ArticleEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const articleHistory = createArticleHistory(command.articleHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const title = createTitle(command.title)
  const timestamp = createTimestamp(command.timestamp)

  const article = reduceToArticle(articleHistory)
  const journal = reduceToJournal(journalHistory)
  const user = reduceToUser(userHistory)

  if (!canUpdateArticle(user, article, journal)) {
    throw new Error(ARTICLE_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'ArticleTitleDefined',
      articleId: article.articleId,
      title,
      timestamp
    }
  ]
}

export default updateArticleTitle

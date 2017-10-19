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
  createDescription,
  createTimestamp
} from 'domain/typeFactories'

function updateArticleDescription (command: {
  userHistory: object[]
  journalHistory: object[]
  articleHistory: object[]
  description: string,
  timestamp: number
}): ArticleEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const articleHistory = createArticleHistory(command.articleHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const description = createDescription(command.description)
  const timestamp = createTimestamp(command.timestamp)

  const article = reduceToArticle(articleHistory)
  const journal = reduceToJournal(journalHistory)
  const user = reduceToUser(userHistory)

  if (!canUpdateArticle(user, article, journal)) {
    throw new Error(ARTICLE_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'ArticleDescriptionDefined',
      articleId: article.articleId,
      description,
      timestamp
    }
  ]
}

export default updateArticleDescription

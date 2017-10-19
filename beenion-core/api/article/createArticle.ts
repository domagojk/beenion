import { ArticleEvent } from 'domain/types/events'
import { canCreateArticle } from 'domain/businessRules'
import { ARTICLE_CREATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToJournal from 'domain/reduceToJournal'
import {
  createUserHistory,
  createJournalHistory,
  createArticleId,
  createTitle,
  createDescription,
  createURL,
  createTimestamp
} from 'domain/typeFactories'

function createArticle (command: {
  userHistory: object[]
  journalHistory: object[]
  articleId: string
  title: string
  description: string
  link: string
  timestamp: number
}): ArticleEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const journalHistory = createJournalHistory(command.journalHistory)
  const articleId = createArticleId(command.articleId)
  const title = createTitle(command.title)
  const description = createDescription(command.description)
  const link = createURL(command.link)
  const timestamp = createTimestamp(command.timestamp)

  const journal = reduceToJournal(journalHistory)
  const user = reduceToUser(userHistory)

  if (!canCreateArticle(user, journal)) {
    throw new Error(ARTICLE_CREATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'ArticleCreated',
      ownerId: user.userId,
      journalId: journal.journalId,
      articleId,
      timestamp
    },
    {
      type: 'ArticleTitleDefined',
      articleId,
      title,
      timestamp
    },
    {
      type: 'ArticleDescriptionDefined',
      articleId,
      description,
      timestamp
    },
    {
      type: 'ArticleLinkDefined',
      articleId,
      link,
      timestamp
    },
    {
      type: 'ArticleStageRulesDefined',
      articleId,
      stageRules: journal.stageRules,
      timestamp
    }
  ]
}

export default createArticle

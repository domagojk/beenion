import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function create (params: {
  user: t.User
  journal: t.Journal
  articleId: t.ArticleId
  title: t.Title
  description: t.Description
  link: t.URL
  timestamp: t.Timestamp
}): t.ArticleEvent[] {
  const { user, journal, articleId, title, description, link, timestamp } = params

  if (!privileges.canCreateArticle(user, journal)) {
    throw errors.permisionDenied()
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

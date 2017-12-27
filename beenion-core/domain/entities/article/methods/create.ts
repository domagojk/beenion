import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function create (params: {
  user: t.User
  newsletter: t.Newsletter
  articleId: t.ArticleId
  title: t.Title
  description: t.Description
  link: t.URL
  timestamp: t.Timestamp
}): t.ArticleEvent[] {
  const { user, newsletter, articleId, title, description, link, timestamp } = params

  if (!privileges.canCreateArticle(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleCreated',
      payload: {
        ownerId: user.userId,
        newsletterId: newsletter.newsletterId,
        articleId,
        timestamp
      }
    },
    {
      type: 'ArticleTitleDefined',
      payload: {
        articleId,
        title,
        timestamp
      }
    },
    {
      type: 'ArticleDescriptionDefined',
      payload: {
        articleId,
        description,
        timestamp
      }
    },
    {
      type: 'ArticleLinkDefined',
      payload: {
        articleId,
        link,
        timestamp
      }
    },
    {
      type: 'ArticleStageRulesDefined',
      payload: {
        articleId,
        stageRules: newsletter.stageRules,
        timestamp
      }
    }
  ]
}

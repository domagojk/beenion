import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function updateDescription (params: {
  user: t.User
  newsletter: t.Newsletter
  article: t.Article
  description: t.Description
  timestamp: t.Timestamp
}): t.ArticleEvent[] {
  const { newsletter, user, article, description, timestamp } = params

  if (article.ownerId !== user.userId) {
    throw errors.userIsNotOwner()
  }

  if (privileges.canUpdateArticle(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleDescriptionDefined',
      payload: {
        articleId: article.articleId,
        description,
        timestamp
      }
    }
  ]
}

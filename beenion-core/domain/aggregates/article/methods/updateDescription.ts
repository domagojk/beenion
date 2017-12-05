import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function updateDescription (params: {
  user: t.User
  journal: t.Journal
  article: t.Article
  description: t.Description
  timestamp: t.Timestamp
}): t.ArticleEvent[] {
  const { journal, user, article, description, timestamp } = params

  if (article.ownerId !== user.userId) {
    throw errors.userIsNotOwner()
  }

  if (privileges.canUpdateArticle(user, journal)) {
    throw errors.permisionDenied()
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

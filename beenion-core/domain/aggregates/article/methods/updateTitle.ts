import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function updateTitle (params: {
  user: t.User
  journal: t.Journal
  article: t.Article
  title: t.Title
  timestamp: t.Timestamp
}): t.ArticleEvent[] {
  const { journal, user, article, title, timestamp } = params

  if (article.ownerId !== user.userId) {
    throw errors.userIsNotOwner()
  }

  if (privileges.canUpdateArticle(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleTitleDefined',
      payload: {
        articleId: article.articleId,
        title,
        timestamp
      }
    }
  ]
}

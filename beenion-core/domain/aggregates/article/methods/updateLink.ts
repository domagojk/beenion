import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function updateLink (params: {
  user: t.User
  journal: t.Journal
  article: t.Article
  link: t.URL
  timestamp: t.Timestamp
}): t.ArticleEvent[] {
  const { journal, user, article, link, timestamp } = params

  if (article.ownerId !== user.userId) {
    throw errors.userIsNotOwner()
  }

  if (privileges.canUpdateArticle(user, journal)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleLinkDefined',
      payload: {
        articleId: article.articleId,
        link,
        timestamp
      }
    }
  ]
}

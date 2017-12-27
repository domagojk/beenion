import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function updateLink (params: {
  user: t.User
  newsletter: t.Newsletter
  article: t.Article
  link: t.URL
  timestamp: t.Timestamp
}): t.ArticleEvent[] {
  const { newsletter, user, article, link, timestamp } = params

  if (article.ownerId !== user.userId) {
    throw errors.userIsNotOwner()
  }

  if (privileges.canUpdateArticle(user, newsletter)) {
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

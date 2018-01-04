import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function updateArticleLink (
  user: t.User,
  newsletter: t.Newsletter,
  article: t.Article,
  link: t.URL,
  timestamp: t.Timestamp
): t.ArticleEvent[] {

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

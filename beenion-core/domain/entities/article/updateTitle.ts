import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function updateArticleTitle (
  user: t.User,
  newsletter: t.Newsletter,
  article: t.Article,
  title: t.Title,
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
      type: 'ArticleTitleDefined',
      payload: {
        articleId: article.articleId,
        title,
        timestamp
      }
    }
  ]
}

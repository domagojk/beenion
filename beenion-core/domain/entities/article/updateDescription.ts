import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function updateArticleDescription (
  user: t.User,
  newsletter: t.Newsletter,
  article: t.Article,
  description: t.Description,
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
      type: 'ArticleDescriptionDefined',
      payload: {
        articleId: article.articleId,
        description,
        timestamp
      }
    }
  ]
}

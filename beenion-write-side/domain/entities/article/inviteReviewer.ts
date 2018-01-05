import { ArticleEvent, User, Newsletter, Article, Timestamp } from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function inviteArticleReviewer (
  reviewer: User,
  newsletter: Newsletter,
  article: Article,
  timestamp: Timestamp
): ArticleEvent[] {
  const rules = article.stageRules[article.currentStage]
  const priviligeName = `canReviewInStage${article.currentStage}`

  if (article.reviewers.length >= rules.maxReviewers) {
    throw errors.maxArticleReviewersReached()
  }

  if (!privileges[priviligeName](reviewer, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleReviewerInvited',
      payload: {
        articleId: article.articleId,
        reviewerId: reviewer.userId,
        timestamp
      }
    }
  ]
}

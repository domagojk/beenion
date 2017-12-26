import { ArticleEvent, User, Journal, Article, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function inviteReviewer (params: {
  reviewer: User
  journal: Journal
  article: Article
  timestamp: Timestamp
}): ArticleEvent[] {
  const { journal, reviewer, article, timestamp } = params
  const rules = article.stageRules[article.currentStage]
  const priviligeName = `canReviewInStage${article.currentStage}`

  if (article.reviewers.length >= rules.maxReviewers) {
    throw errors.maxArticleReviewersReached()
  }

  if (!privileges[priviligeName](reviewer, journal)) {
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

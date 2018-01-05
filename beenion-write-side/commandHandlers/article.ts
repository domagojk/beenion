import * as t from '../domain/types'
import { createArticle } from '../domain/entities/article/create'
import { banArticle } from '../domain/entities/article/ban'
import { deleteArticle } from '../domain/entities/article/delete'
import { unbanArticle } from '../domain/entities/article/unban'
import { updateArticleDescription } from '../domain/entities/article/updateDescription'
import { updateArticleLink } from '../domain/entities/article/updateLink'
import { updateArticleTitle } from '../domain/entities/article/updateTitle'
import { rejectApprovedArticle } from '../domain/entities/article/rejectApproved'
import { resubmitArticle } from '../domain/entities/article/resubmit'
import { reviewArticle } from '../domain/entities/article/review'
import { inviteArticleReviewer } from '../domain/entities/article/inviteReviewer'
import { removeArticleReviewer } from '../domain/entities/article/removeReviewer'

type CommandHandlers = {
  [C in keyof t.ArticleCommands]: (
    command: t.ArticleCommands[C]
  ) => Promise<any>
}

export const articleCommandHandlers = (
  userRepository: t.UserRepository,
  newsletterRepository: t.NewsletterRepository,
  articleRepository: t.ArticleRepository
): CommandHandlers => ({

  CreateArticle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { save } = await articleRepository.create(payload.articleId)

    return await save(
      createArticle(
        userState,
        newsletterState,
        payload.articleId,
        payload.title,
        payload.description,
        payload.link,
        payload.timestamp
      )
    )
  },

  BanArticle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      banArticle(
        userState,
        newsletterState,
        articleState,
        payload.timestamp
      )
    )
  },

  DeleteArticle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      deleteArticle(
        userState,
        newsletterState,
        articleState,
        payload.timestamp
      )
    )
  },

  UnbanArticle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      unbanArticle(
        userState,
        newsletterState,
        articleState,
        payload.timestamp
      )
    )
  },

  UpdateArticleDescription: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      updateArticleDescription(
        userState,
        newsletterState,
        articleState,
        payload.description,
        payload.timestamp
      )
    )
  },

  UpdateArticleLink: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      updateArticleLink(
        userState,
        newsletterState,
        articleState,
        payload.link,
        payload.timestamp
      )
    )
  },

  UpdateArticleTitle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      updateArticleTitle(
        userState,
        newsletterState,
        articleState,
        payload.title,
        payload.timestamp
      )
    )
  },

  RejectApprovedArticle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      rejectApprovedArticle(
        userState,
        newsletterState,
        articleState,
        payload.timestamp
      )
    )
  },

  ResubmitArticle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      resubmitArticle(
        userState,
        newsletterState,
        articleState,
        payload.timestamp
      )
    )
  },

  ReviewArticle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      reviewArticle(
        userState,
        articleState,
        payload.evaluation,
        payload.timestamp
      )
    )
  },

  InviteArticleReviewer: async ({ payload }) => {

    const { userState } = await userRepository.getById(payload.reviewerId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      inviteArticleReviewer(
        userState,
        newsletterState,
        articleState,
        payload.timestamp
      )
    )
  },

  RemoveArticleReviewer: async ({ payload }) => {

    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      removeArticleReviewer(
        payload.reviewerId,
        articleState,
        payload.timestamp
      )
    )
  }
})

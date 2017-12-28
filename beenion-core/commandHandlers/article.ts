import * as t from '../domain/types'
import { publicCommands, privateCommands } from '../domain/types/article/commands'
import validate from '../domain/validateCommand'
import * as article from '../domain/entities/article'

type CommandHandler = {
  [Command in keyof t.ArticleCommands]: (command: object) => Promise<any>
}

export default (
  userRepository: t.UserRepository,
  newsletterRepository: t.NewsletterRepository,
  articleRepository: t.ArticleRepository
): CommandHandler => ({

  CreateArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.CreateArticle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { save } = await articleRepository.create(payload.articleId)

    return await save(
      article.create({
        user: userState,
        newsletter: newsletterState,
        articleId: payload.articleId,
        description: payload.description,
        link: payload.link,
        title: payload.title,
        timestamp: payload.timestamp
      })
    )
  },

  BanArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.BanArticle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.ban({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        timestamp: payload.timestamp
      })
    )
  },

  DeleteArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DeleteArticle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.del({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        timestamp: payload.timestamp
      })
    )
  },

  UnbanArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UnbanArticle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.unban({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        timestamp: payload.timestamp
      })
    )
  },

  UpdateArticleDescription: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UpdateArticleDescription
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.updateDescription({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        description: payload.description,
        timestamp: payload.timestamp
      })
    )
  },

  UpdateArticleLink: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UpdateArticleLink
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.updateLink({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        link: payload.link,
        timestamp: payload.timestamp
      })
    )
  },

  UpdateArticleTitle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UpdateArticleTitle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.updateTitle({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        title: payload.title,
        timestamp: payload.timestamp
      })
    )
  },

  RejectApprovedArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RejectApprovedArticle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.rejectApproved({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        timestamp: payload.timestamp
      })
    )
  },

  ResubmitArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.ResubmitArticle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.resubmit({
        user: userState,
        newsletter: newsletterState,
        article: articleState,
        timestamp: payload.timestamp
      })
    )
  },

  ReviewArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.ReviewArticle
    )

    const { userState } = await userRepository.getById(userId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.review({
        reviewer: userState,
        article: articleState,
        evaluation: payload.evaluation,
        timestamp: payload.timestamp
      })
    )
  },

  InviteArticleReviewer: async (command: object) => {
    const { payload } = validate(
      command,
      privateCommands.props.InviteArticleReviewer
    )

    const { userState } = await userRepository.getById(payload.reviewerId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)
    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.inviteReviewer({
        reviewer: userState,
        newsletter: newsletterState,
        article: articleState,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveArticleReviewer: async (command: object) => {
    const { payload } = validate(
      command,
      privateCommands.props.RemoveArticleReviewer
    )

    const { articleState, save } = await articleRepository.getById(payload.articleId)

    return await save(
      article.removeReviewer({
        reviewerId: payload.reviewerId,
        article: articleState,
        timestamp: payload.timestamp
      })
    )
  }
})

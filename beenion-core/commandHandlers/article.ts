import * as t from '../domain/types'
import { publicCommands, privateCommands } from '../domain/types/article/commands'
import validate from '../domain/validateCommand'
import * as article from '../domain/entities/article'

type CommandHandler = {
  [Command in keyof t.ArticleCommands]: (command: object) => Promise<any>
}

export default (
  userRepository: t.UserRepository,
  journalRepository: t.JournalRepository,
  articleRepository: t.ArticleRepository
): CommandHandler => ({

  CreateArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.CreateArticle
    )

    return await articleRepository.save({
      events: article.create({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        articleId: payload.articleId,
        description: payload.description,
        link: payload.link,
        title: payload.title,
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: 0
    })
  },

  BanArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.BanArticle
    )

    return await articleRepository.save({
      events: article.ban({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  DeleteArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DeleteArticle
    )

    return await articleRepository.save({
      events: article.del({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  UnbanArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UnbanArticle
    )

    return await articleRepository.save({
      events: article.unban({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  UpdateArticleDescription: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UpdateArticleDescription
    )

    return await articleRepository.save({
      events: article.updateDescription({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        description: payload.description,
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  UpdateArticleLink: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UpdateArticleLink
    )

    return await articleRepository.save({
      events: article.updateLink({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        link: payload.link,
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  UpdateArticleTitle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.UpdateArticleTitle
    )

    return await articleRepository.save({
      events: article.updateTitle({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        title: payload.title,
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  RejectApprovedArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RejectApprovedArticle
    )

    return await articleRepository.save({
      events: article.rejectApproved({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  ResubmitArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.ResubmitArticle
    )

    return await articleRepository.save({
      events: article.resubmit({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  ReviewArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.ReviewArticle
    )

    return await articleRepository.save({
      events: article.review({
        reviewer: await userRepository.getById(userId),
        article: await articleRepository.getById(payload.articleId),
        evaluation: payload.evaluation,
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  InviteArticleReviewer: async (command: object) => {
    const { payload } = validate(
      command,
      privateCommands.props.InviteArticleReviewer
    )

    return await articleRepository.save({
      events: article.inviteReviewer({
        reviewer: await userRepository.getById(payload.reviewerId),
        journal: await journalRepository.getById(payload.journalId),
        article: await articleRepository.getById(payload.articleId),
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  },

  RemoveArticleReviewer: async (command: object) => {
    const { payload } = validate(
      command,
      privateCommands.props.RemoveArticleReviewer
    )

    return await articleRepository.save({
      events: article.removeReviewer({
        reviewerId: payload.reviewerId,
        article: await articleRepository.getById(payload.articleId),
        timestamp: payload.timestamp
      }),
      id: payload.articleId,
      expectedVersion: payload.revision
    })
  }
})

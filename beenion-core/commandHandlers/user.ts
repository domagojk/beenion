import { UserRepository, JournalRepository, UserCommands } from '../types'
import { publicCommands, privateCommands } from '../types/user/commands'
import validate from '../domain/validateCommand'
import * as user from '../domain/user'

type CommandHandler = {
  [Command in keyof UserCommands]: (command: object) => Promise<any>
}

export default (
  userRepository: UserRepository,
  journalRepository: JournalRepository
): CommandHandler => ({

  CreateUser: async (command: object) => {
    const { payload } = validate(command, privateCommands.props.CreateUser)

    return await userRepository.save({
      events: user.create({
        userId: payload.userId,
        timestamp: payload.timestamp
      }),
      id: payload.userId,
      expectedVersion: 0
    })
  },

  DeclineReviewInvitation: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DeclineReviewInvitation
    )

    return await userRepository.save({
      events: user.declineReviewInvitation({
        reviewOwnerId: userId,
        articleId: payload.articleId,
        journalId: payload.journalId,
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  },

  ExpireReviewInvitation: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.ExpireReviewInvitation
    )

    return await userRepository.save({
      events: user.expireReviewInvitation({
        reviewOwnerId: userId,
        articleId: payload.articleId,
        journalId: payload.journalId,
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  },

  RateArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RateArticle
    )

    return await userRepository.save({
      events: user.rateArticle({
        voter: await userRepository.getById(userId),
        articleOwner: await userRepository.getById(payload.articleOwnerId),
        journal: await journalRepository.getById(payload.journalId),
        articleId: payload.articleId,
        medal: payload.medal,
        rating: payload.rating,
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  },

  RateReview: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RateReview
    )

    return await userRepository.save({
      events: user.rateReview({
        voter: await userRepository.getById(userId),
        reviewOwner: await userRepository.getById(payload.reviewOwnerId),
        journal: await journalRepository.getById(payload.journalId),
        articleId: payload.articleId,
        medal: payload.medal,
        rating: payload.rating,
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  },

  RateUser: async (command: object) => {
    const { userId, payload } = validate(command, publicCommands.props.RateUser)

    return await userRepository.save({
      events: user.rateUser({
        voter: await userRepository.getById(userId),
        user: await userRepository.getById(payload.userId),
        medal: payload.medal,
        rating: payload.rating,
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  },

  WithdrawArticleVote: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.WithdrawArticleVote
    )

    return await userRepository.save({
      events: user.withdrawArticleVote({
        voter: await userRepository.getById(userId),
        articleOwner: await userRepository.getById(payload.articleOwnerId),
        articleId: payload.articleId,
        journalId: payload.journalId,
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  },

  WithdrawReviewVote: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.WithdrawReviewVote
    )

    return await userRepository.save({
      events: user.withdrawReviewVote({
        voter: await userRepository.getById(userId),
        reviewOwner: await userRepository.getById(payload.reviewOwnerId),
        articleId: payload.articleId,
        journalId: payload.journalId,
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  },

  WithdrawUserVote: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.WithdrawUserVote
    )

    return await userRepository.save({
      events: user.withdrawUserVote({
        voter: await userRepository.getById(userId),
        user: await userRepository.getById(payload.userId),
        timestamp: payload.timestamp
      }),
      id: userId,
      expectedVersion: payload.revision
    })
  }
})

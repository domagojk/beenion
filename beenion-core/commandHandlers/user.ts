import { UserRepository, NewsletterRepository, UserCommands } from '../domain/types'
import { publicCommands, privateCommands } from '../domain/types/user/commands'
import validate from '../domain/validateCommand'
import * as user from '../domain/entities/user'

type CommandHandler = {
  [Command in keyof UserCommands]: (command: object) => Promise<any>
}

export default (
  userRepository: UserRepository,
  newsletterRepository: NewsletterRepository
): CommandHandler => ({

  CreateUser: async (command: object) => {
    const { payload } = validate(command, privateCommands.props.CreateUser)

    const { save } = await userRepository.getById(payload.userId)

    return await save(
      user.create({
        userId: payload.userId,
        timestamp: payload.timestamp
      })
    )
  },

  DeclineReviewInvitation: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DeclineReviewInvitation
    )

    const { save } = await userRepository.getById(userId)

    return await save(
      user.declineReviewInvitation({
        reviewOwnerId: userId,
        articleId: payload.articleId,
        newsletterId: payload.newsletterId,
        timestamp: payload.timestamp
      })
    )
  },

  ExpireReviewInvitation: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.ExpireReviewInvitation
    )

    const { save } = await userRepository.getById(userId)

    return await save(
      user.expireReviewInvitation({
        reviewOwnerId: userId,
        articleId: payload.articleId,
        newsletterId: payload.newsletterId,
        timestamp: payload.timestamp
      })
    )
  },

  RateArticle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RateArticle
    )

    const voter = await userRepository.getById(userId)
    const articleOwner = await userRepository.getById(payload.articleOwnerId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)

    return await voter.save(
      user.rateArticle({
        voter: voter.userState,
        articleOwner: articleOwner.userState,
        newsletter: newsletterState,
        articleId: payload.articleId,
        medal: payload.medal,
        rating: payload.rating,
        timestamp: payload.timestamp
      })
    )
  },

  RateReview: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RateReview
    )

    const voter = await userRepository.getById(userId)
    const reviewOwner = await userRepository.getById(payload.reviewOwnerId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)

    return await voter.save(
      user.rateReview({
        voter: voter.userState,
        reviewOwner: reviewOwner.userState,
        newsletter: newsletterState,
        articleId: payload.articleId,
        medal: payload.medal,
        rating: payload.rating,
        timestamp: payload.timestamp
      })
    )
  },

  RateUser: async (command: object) => {
    const { userId, payload } = validate(command, publicCommands.props.RateUser)

    const voter = await userRepository.getById(userId)
    const votedUser = await userRepository.getById(payload.userId)

    return await voter.save(
      user.rateUser({
        voter: voter.userState,
        user: votedUser.userState,
        medal: payload.medal,
        rating: payload.rating,
        timestamp: payload.timestamp
      })
    )
  },

  WithdrawArticleVote: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.WithdrawArticleVote
    )

    const voter = await userRepository.getById(userId)
    const articleOwner = await userRepository.getById(payload.articleOwnerId)

    return await voter.save(
      user.withdrawArticleVote({
        voter: voter.userState,
        articleOwner: articleOwner.userState,
        articleId: payload.articleId,
        newsletterId: payload.newsletterId,
        timestamp: payload.timestamp
      })
    )
  },

  WithdrawReviewVote: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.WithdrawReviewVote
    )

    const voter = await userRepository.getById(userId)
    const reviewOwner = await userRepository.getById(payload.reviewOwnerId)

    return await voter.save(
      user.withdrawReviewVote({
        voter: voter.userState,
        reviewOwner: reviewOwner.userState,
        articleId: payload.articleId,
        newsletterId: payload.newsletterId,
        timestamp: payload.timestamp
      })
    )
  },

  WithdrawUserVote: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.WithdrawUserVote
    )

    const voter = await userRepository.getById(userId)
    const votedUser = await userRepository.getById(payload.userId)

    return await voter.save(
      user.withdrawUserVote({
        voter: voter.userState,
        user: votedUser.userState,
        timestamp: payload.timestamp
      })
    )
  }
})

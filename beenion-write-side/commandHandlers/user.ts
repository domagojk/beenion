import * as t from '../domain/types'
import { createUser } from '../domain/entities/user/create'
import { declineReviewInvitation } from '../domain/entities/user/declineReviewInvitation'
import { expireReviewInvitation } from '../domain/entities/user/expireReviewInvitation'
import { rateArticle } from '../domain/entities/user/rateArticle'
import { rateReview } from '../domain/entities/user/rateReview'
import { rateUser } from '../domain/entities/user/rateUser'
import { withdrawArticleVote } from '../domain/entities/user/withdrawArticleVote'
import { withdrawReviewVote } from '../domain/entities/user/withdrawReviewVote'
import { withdrawUserVote } from '../domain/entities/user/withdrawUserVote'

type CommandHandlers = {
  [C in keyof t.UserCommands]: (
    command: t.UserCommands[C]
  ) => Promise<any>
}

export const userCommandHandlers = (
  userRepository: t.UserRepository,
  newsletterRepository: t.NewsletterRepository
): CommandHandlers => ({

  CreateUser: async ({ userId, payload }) => {

    const { save } = userRepository.create(userId)

    return await save(
      createUser(
        userId,
        payload.timestamp
      )
    )
  },

  DeclineReviewInvitation: async ({ userId, payload }) => {

    const { save } = await userRepository.getById(userId)

    return await save(
      declineReviewInvitation(
        userId,
        payload.articleId,
        payload.newsletterId,
        payload.timestamp
      )
    )
  },

  ExpireReviewInvitation: async ({ userId, payload }) => {

    const { save } = await userRepository.getById(userId)

    return await save(
      expireReviewInvitation(
        userId,
        payload.articleId,
        payload.newsletterId,
        payload.timestamp
      )
    )
  },

  RateArticle: async ({ userId, payload }) => {

    const voter = await userRepository.getById(userId)
    const articleOwner = await userRepository.getById(payload.articleOwnerId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)

    return await voter.save(
      rateArticle(
        voter.userState,
        payload.articleId,
        articleOwner.userState,
        newsletterState,
        payload.medal,
        payload.rating,
        payload.timestamp
      )
    )
  },

  RateReview: async ({ userId, payload }) => {

    const voter = await userRepository.getById(userId)
    const reviewOwner = await userRepository.getById(payload.reviewOwnerId)
    const { newsletterState } = await newsletterRepository.getById(payload.newsletterId)

    return await voter.save(
      rateReview(
        voter.userState,
        reviewOwner.userState,
        newsletterState,
        payload.articleId,
        payload.medal,
        payload.rating,
        payload.timestamp
      )
    )
  },

  RateUser: async ({ userId, payload }) => {

    const voter = await userRepository.getById(userId)
    const votedUser = await userRepository.getById(payload.userId)

    return await voter.save(
      rateUser(
        voter.userState,
        votedUser.userState,
        payload.medal,
        payload.rating,
        payload.timestamp
      )
    )
  },

  WithdrawArticleVote: async ({ userId, payload }) => {

    const voter = await userRepository.getById(userId)
    const articleOwner = await userRepository.getById(payload.articleOwnerId)

    return await voter.save(
      withdrawArticleVote(
        voter.userState,
        articleOwner.userState,
        payload.articleId,
        payload.newsletterId,
        payload.timestamp
      )
    )
  },

  WithdrawReviewVote: async ({ userId, payload }) => {

    const voter = await userRepository.getById(userId)
    const reviewOwner = await userRepository.getById(payload.reviewOwnerId)

    return await voter.save(
      withdrawReviewVote(
        voter.userState,
        reviewOwner.userState,
        payload.articleId,
        payload.newsletterId,
        payload.timestamp
      )
    )
  },

  WithdrawUserVote: async ({ userId, payload }) => {

    const voter = await userRepository.getById(userId)
    const votedUser = await userRepository.getById(payload.userId)

    return await voter.save(
      withdrawUserVote(
        voter.userState,
        votedUser.userState,
        payload.timestamp
      )
    )
  }
})

import * as t from '../domain/types'
import { createNewsletter } from '../domain/entities/newsletter/create'
import { addNewsletterEditor } from '../domain/entities/newsletter/addEditor'
import { confirmNewsletterEditor } from '../domain/entities/newsletter/confirmEditor'
import { defineNewsletterDescription } from '../domain/entities/newsletter/defineDescription'
import { defineNewsletterPrivilege } from '../domain/entities/newsletter/definePrivilege'
import { defineNewsletterRankEvent } from '../domain/entities/newsletter/defineRankEvent'
import { defineNewsletterRankGroup } from '../domain/entities/newsletter/defineRankGroup'
import { defineNewsletterStageRule } from '../domain/entities/newsletter/defineStageRule'
import { defineNewsletterTitle } from '../domain/entities/newsletter/defineTitle'
import { deleteNewsletter } from '../domain/entities/newsletter/delete'
import { removeNewsletterEditor } from '../domain/entities/newsletter/removeEditor'
import { removeNewsletterPermission } from '../domain/entities/newsletter/removePermission'
import { removeNewsletterRankEvent } from '../domain/entities/newsletter/removeRankEvent'
import { removeNewsletterRankGroup } from '../domain/entities/newsletter/removeRankGroup'
import { removeNewsletterStageRule } from '../domain/entities/newsletter/removeStageRule'

type CommandHandlers = {
  [C in keyof t.NewsletterCommands]: (
    command: t.NewsletterCommands[C]
  ) => Promise<any>
}

export const newsletterCommandHandlers = (
  userRepository: t.UserRepository,
  newsletterRepository: t.NewsletterRepository
): CommandHandlers => ({

  CreateNewsletter: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { save } = await newsletterRepository.create(payload.newsletterId)

    return await save(
      createNewsletter(
        userState,
        payload.description,
        payload.newsletterId,
        payload.title,
        payload.timestamp
      )
    )
  },

  AddNewsletterEditor: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      addNewsletterEditor(
        userState,
        newsletterState,
        payload.editorInfo,
        payload.timestamp
      )
    )
  },

  ConfirmNewsletterEditor: async ({ payload }) => {

    const { userState } = await userRepository.getById(payload.editorId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      confirmNewsletterEditor(
        userState,
        newsletterState,
        payload.editorInfo,
        payload.timestamp
      )
    )
  },

  DefineNewsletterDescription: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      defineNewsletterDescription(
        userState,
        newsletterState,
        payload.description,
        payload.timestamp
      )
    )
  },

  DefineNewsletterPrivilege: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      defineNewsletterPrivilege(
        userState,
        newsletterState,
        payload.privilege,
        payload.permission,
        payload.timestamp
      )
    )
  },

  DefineNewsletterTitle: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      defineNewsletterTitle(
        userState,
        newsletterState,
        payload.title,
        payload.timestamp
      )
    )
  },

  DefineRankEvent: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      defineNewsletterRankEvent(
        userState,
        newsletterState,
        payload.factor,
        payload.group,
        payload.userEventType,
        payload.timestamp
      )
    )
  },

  DefineRankGroup: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      defineNewsletterRankGroup(
        userState,
        newsletterState,
        payload.group,
        payload.rankRange,
        payload.timestamp
      )
    )
  },

  DefineStageRule: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      defineNewsletterStageRule(
        userState,
        newsletterState,
        payload.stage,
        payload.stageRule,
        payload.timestamp
      )
    )
  },

  DeleteNewsletter: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      deleteNewsletter(
        userState,
        newsletterState,
        payload.timestamp
      )
    )
  },

  RemoveNewsletterEditor: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      removeNewsletterEditor(
        userState,
        newsletterState,
        payload.editorId,
        payload.timestamp
      )
    )
  },

  RemoveNewsletterPermission: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      removeNewsletterPermission(
        userState,
        newsletterState,
        payload.privilege,
        payload.timestamp
      )
    )
  },

  RemoveRankEvent: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      removeNewsletterRankEvent(
        userState,
        newsletterState,
        payload.userEventType,
        payload.timestamp
      )
    )
  },

  RemoveRankGroup: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      removeNewsletterRankGroup(
        userState,
        newsletterState,
        payload.group,
        payload.timestamp
      )
    )
  },

  RemoveStageRule: async ({ userId, payload }) => {

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      removeNewsletterStageRule(
        userState,
        newsletterState,
        payload.stage,
        payload.timestamp
      )
    )
  }
})

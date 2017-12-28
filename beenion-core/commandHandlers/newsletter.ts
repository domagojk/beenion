import { UserRepository, NewsletterRepository, NewsletterCommands } from '../domain/types'
import { publicCommands } from '../domain/types/newsletter/commands'
import validate from '../domain/validateCommand'
import * as newsletter from '../domain/entities/newsletter'

type CommandHandler = {
  [Command in keyof NewsletterCommands]: (command: object) => Promise<any>
}

const newsletterCommandHandlers = (
  userRepository: UserRepository,
  newsletterRepository: NewsletterRepository
): CommandHandler => ({

  CreateNewsletter: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.CreateNewsletter
    )

    const { userState } = await userRepository.getById(userId)
    const { save } = await newsletterRepository.create(payload.newsletterId)

    return await save(
      newsletter.create({
        user: userState,
        description: payload.description,
        newsletterId: payload.newsletterId,
        title: payload.title,
        timestamp: payload.timestamp
      })
    )
  },

  AddNewsletterEditor: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.AddNewsletterEditor
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.addEditor({
        user: userState,
        newsletter: newsletterState,
        editorInfo: payload.editorInfo,
        timestamp: payload.timestamp
      })
    )
  },

  ConfirmNewsletterEditor: async (command: object) => {
    const { payload } = validate(
      command,
      publicCommands.props.ConfirmNewsletterEditor
    )

    const { userState } = await userRepository.getById(payload.editorId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.confirmEditor({
        editor: userState,
        newsletter: newsletterState,
        editorInfo: payload.editorInfo,
        timestamp: payload.timestamp
      })
    )
  },

  DefineNewsletterDescription: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineNewsletterDescription
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.defineDescription({
        user: userState,
        newsletter: newsletterState,
        description: payload.description,
        timestamp: payload.timestamp
      })
    )
  },

  DefineNewsletterPrivilege: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineNewsletterPrivilege
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.definePrivilege({
        user: userState,
        newsletter: newsletterState,
        privilege: payload.privilege,
        permission: payload.permission,
        timestamp: payload.timestamp
      })
    )
  },

  DefineNewsletterTitle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineNewsletterTitle
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.defineTitle({
        user: userState,
        newsletter: newsletterState,
        title: payload.title,
        timestamp: payload.timestamp
      })
    )
  },

  DefineRankCalcEvent: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineRankCalcEvent
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.defineRankCalcEvent({
        user: userState,
        newsletter: newsletterState,
        factor: payload.factor,
        group: payload.group,
        userEventType: payload.userEventType,
        timestamp: payload.timestamp
      })
    )
  },

  DefineRankCalcGroup: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineRankCalcGroup
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.defineRankCalcGroup({
        user: userState,
        newsletter: newsletterState,
        group: payload.group,
        rankRange: payload.rankRange,
        timestamp: payload.timestamp
      })
    )
  },

  DefineStageRule: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineStageRule
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.defineStageRule({
        user: userState,
        newsletter: newsletterState,
        stage: payload.stage,
        stageRule: payload.stageRule,
        timestamp: payload.timestamp
      })
    )
  },

  DeleteNewsletter: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DeleteNewsletter
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.del({
        user: userState,
        newsletter: newsletterState,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveNewsletterEditor: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveNewsletterEditor
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.removeEditor({
        user: userState,
        newsletter: newsletterState,
        editorId: payload.editorId,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveNewsletterPermission: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveNewsletterPermission
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.removePermission({
        user: userState,
        newsletter: newsletterState,
        privilege: payload.privilege,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveRankCalcEvent: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveRankCalcEvent
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.removeRankCalcEvent({
        user: userState,
        newsletter: newsletterState,
        userEventType: payload.userEventType,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveRankCalcGroup: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveRankCalcGroup
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.removeRankCalcGroup({
        user: userState,
        newsletter: newsletterState,
        group: payload.group,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveStageRule: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveStageRule
    )

    const { userState } = await userRepository.getById(userId)
    const { newsletterState, save } = await newsletterRepository.getById(payload.newsletterId)

    return await save(
      newsletter.removeStageRule({
        user: userState,
        newsletter: newsletterState,
        stage: payload.stage,
        timestamp: payload.timestamp
      })
    )
  }
})

export default newsletterCommandHandlers

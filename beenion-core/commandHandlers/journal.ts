import { UserRepository, JournalRepository, JournalCommands } from '../domain/types'
import { publicCommands } from '../domain/types/journal/commands'
import validate from '../domain/validateCommand'
import * as journal from '../domain/aggregates/journal'

type CommandHandler = {
  [Command in keyof JournalCommands]: (command: object) => Promise<any>
}

const journalCommandHandlers = (
  userRepository: UserRepository,
  journalRepository: JournalRepository
): CommandHandler => ({

  CreateJournal: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.CreateJournal
    )

    const { userState } = await userRepository.getById(userId)
    const { save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.create({
        user: userState,
        description: payload.description,
        journalId: payload.journalId,
        title: payload.title,
        timestamp: payload.timestamp
      })
    )
  },

  AddJournalEditor: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.AddJournalEditor
    )

    const { userState } = await userRepository.getById(userId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.addEditor({
        user: userState,
        journal: journalState,
        editorInfo: payload.editorInfo,
        timestamp: payload.timestamp
      })
    )
  },

  ConfirmJournalEditor: async (command: object) => {
    const { payload } = validate(
      command,
      publicCommands.props.ConfirmJournalEditor
    )

    const { userState } = await userRepository.getById(payload.editorId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.confirmEditor({
        editor: userState,
        journal: journalState,
        editorInfo: payload.editorInfo,
        timestamp: payload.timestamp
      })
    )
  },

  DefineJournalDescription: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineJournalDescription
    )

    const { userState } = await userRepository.getById(userId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.defineDescription({
        user: userState,
        journal: journalState,
        description: payload.description,
        timestamp: payload.timestamp
      })
    )
  },

  DefineJournalPrivilege: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineJournalPrivilege
    )

    const { userState } = await userRepository.getById(userId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.definePrivilege({
        user: userState,
        journal: journalState,
        privilege: payload.privilege,
        permission: payload.permission,
        timestamp: payload.timestamp
      })
    )
  },

  DefineJournalTitle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineJournalTitle
    )

    const { userState } = await userRepository.getById(userId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.defineTitle({
        user: userState,
        journal: journalState,
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
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.defineRankCalcEvent({
        user: userState,
        journal: journalState,
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
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.defineRankCalcGroup({
        user: userState,
        journal: journalState,
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
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.defineStageRule({
        user: userState,
        journal: journalState,
        stage: payload.stage,
        stageRule: payload.stageRule,
        timestamp: payload.timestamp
      })
    )
  },

  DeleteJournal: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DeleteJournal
    )

    const { userState } = await userRepository.getById(userId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.del({
        user: userState,
        journal: journalState,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveJournalEditor: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveJournalEditor
    )

    const { userState } = await userRepository.getById(userId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.removeEditor({
        user: userState,
        journal: journalState,
        editorId: payload.editorId,
        timestamp: payload.timestamp
      })
    )
  },

  RemoveJournalPermission: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveJournalPermission
    )

    const { userState } = await userRepository.getById(userId)
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.removePermission({
        user: userState,
        journal: journalState,
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
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.removeRankCalcEvent({
        user: userState,
        journal: journalState,
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
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.removeRankCalcGroup({
        user: userState,
        journal: journalState,
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
    const { journalState, save } = await journalRepository.getById(payload.journalId)

    return await save(
      journal.removeStageRule({
        user: userState,
        journal: journalState,
        stage: payload.stage,
        timestamp: payload.timestamp
      })
    )
  }
})

export default journalCommandHandlers

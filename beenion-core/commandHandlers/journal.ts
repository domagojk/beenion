import { UserRepository, JournalRepository, JournalCommands } from '../domain/types'
import { publicCommands } from '../domain/types/journal/commands'
import validate from '../domain/validateCommand'
import * as journal from '../domain/entities/journal'

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

    return await journalRepository.save({
      events: journal.create({
        user: await userRepository.getById(userId),
        description: payload.description,
        journalId: payload.journalId,
        title: payload.title,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: 0
    })
  },

  AddJournalEditor: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.AddJournalEditor
    )

    return await journalRepository.save({
      events: journal.addEditor({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        editorInfo: payload.editorInfo,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  ConfirmJournalEditor: async (command: object) => {
    const { payload } = validate(
      command,
      publicCommands.props.ConfirmJournalEditor
    )

    return await journalRepository.save({
      events: journal.confirmEditor({
        editor: await userRepository.getById(payload.editorId),
        journal: await journalRepository.getById(payload.journalId),
        editorInfo: payload.editorInfo,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  DefineJournalDescription: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineJournalDescription
    )

    return await journalRepository.save({
      events: journal.defineDescription({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        description: payload.description,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  DefineJournalPrivilege: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineJournalPrivilege
    )

    return await journalRepository.save({
      events: journal.definePrivilege({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        privilege: payload.privilege,
        permission: payload.permission,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  DefineJournalTitle: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineJournalTitle
    )

    return await journalRepository.save({
      events: journal.defineTitle({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        title: payload.title,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  DefineRankCalcEvent: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineRankCalcEvent
    )

    return await journalRepository.save({
      events: journal.defineRankCalcEvent({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        factor: payload.factor,
        group: payload.group,
        userEventType: payload.userEventType,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  DefineRankCalcGroup: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineRankCalcGroup
    )

    return await journalRepository.save({
      events: journal.defineRankCalcGroup({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        group: payload.group,
        rankRange: payload.rankRange,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  DefineStageRule: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DefineStageRule
    )

    return await journalRepository.save({
      events: journal.defineStageRule({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        stage: payload.stage,
        stageRule: payload.stageRule,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  DeleteJournal: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.DeleteJournal
    )

    return await journalRepository.save({
      events: journal.del({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  RemoveJournalEditor: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveJournalEditor
    )

    return await journalRepository.save({
      events: journal.removeEditor({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        editorId: payload.editorId,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  RemoveJournalPermission: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveJournalPermission
    )

    return await journalRepository.save({
      events: journal.removePermission({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        privilege: payload.privilege,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  RemoveRankCalcEvent: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveRankCalcEvent
    )

    return await journalRepository.save({
      events: journal.removeRankCalcEvent({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        userEventType: payload.userEventType,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  RemoveRankCalcGroup: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveRankCalcGroup
    )

    return await journalRepository.save({
      events: journal.removeRankCalcGroup({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        group: payload.group,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  },

  RemoveStageRule: async (command: object) => {
    const { userId, payload } = validate(
      command,
      publicCommands.props.RemoveStageRule
    )

    return await journalRepository.save({
      events: journal.removeStageRule({
        user: await userRepository.getById(userId),
        journal: await journalRepository.getById(payload.journalId),
        stage: payload.stage,
        timestamp: payload.timestamp
      }),
      id: payload.journalId,
      expectedVersion: payload.revision
    })
  }
})

export default journalCommandHandlers

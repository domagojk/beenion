import { type, map } from 'io-ts'
import * as input from '../input'
import { UserEvent } from '../user/events'

export const privateCommands = null

export const publicCommands = type({
  CreateJournal: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      title: input.Title,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  AddJournalEditor: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      editorInfo: input.UserInfo,
      timestamp: input.Timestamp
    })
  }),

  ConfirmJournalEditor: type({
    payload: type({
      editorId: input.UserId,
      editorInfo: input.UserInfo,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  DefineJournalDescription: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  DefineJournalPrivilege: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      privilege: input.JournalPrivilege,
      permission: input.JournalPermission,
      timestamp: input.Timestamp
    })
  }),

  DefineJournalTitle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  DefineRankCalcEvent: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      userEventType: map(t => t.type, UserEvent),
      factor: input.RankFactor,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  DefineRankCalcGroup: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      rankRange: input.RankRange,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  DefineStageRule: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      stage: input.Stage,
      stageRule: input.StageRule,
      timestamp: input.Timestamp
    })
  }),

  DeleteJournal: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  RemoveJournalEditor: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      editorId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  RemoveJournalPermission: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      privilege: input.JournalPrivilege,
      timestamp: input.Timestamp
    })
  }),

  RemoveRankCalcEvent: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      userEventType: map(t => t.type, UserEvent),
      timestamp: input.Timestamp
    })
  }),

  RemoveRankCalcGroup: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  RemoveStageRule: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      stage: input.Stage,
      timestamp: input.Timestamp
    })
  })
})

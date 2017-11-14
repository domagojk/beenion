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
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  AddJournalEditor: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      editorInfo: input.UserInfo,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  ConfirmJournalEditor: type({
    payload: type({
      editorId: input.UserId,
      editorInfo: input.UserInfo,
      journalId: input.JournalId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DefineJournalDescription: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      description: input.Description,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DefineJournalPrivilege: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      privilege: input.JournalPrivilege,
      permission: input.JournalPermission,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DefineJournalTitle: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      title: input.Title,
      revision: input.NonNegativeInt,
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
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DefineRankCalcGroup: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      rankRange: input.RankRange,
      group: input.RankGroup,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DefineStageRule: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      stage: input.Stage,
      stageRule: input.StageRule,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  DeleteJournal: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RemoveJournalEditor: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      editorId: input.UserId,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RemoveJournalPermission: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      privilege: input.JournalPrivilege,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RemoveRankCalcEvent: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      userEventType: map(t => t.type, UserEvent),
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RemoveRankCalcGroup: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      group: input.RankGroup,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  }),

  RemoveStageRule: type({
    userId: input.UserId,
    payload: type({
      journalId: input.JournalId,
      stage: input.Stage,
      revision: input.NonNegativeInt,
      timestamp: input.Timestamp
    })
  })
})

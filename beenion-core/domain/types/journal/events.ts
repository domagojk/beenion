import { type, literal, union, map } from 'io-ts'
import * as input from '../input'
import { UserEvent } from '../user/events'

export const JournalEvent = union([
  type({
    type: literal('JournalCreated'),
    payload: type({
      journalId: input.JournalId,
      ownerId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalDeleted'),
    payload: type({
      userId: input.UserId,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalTitleDefined'),
    payload: type({
      journalId: input.JournalId,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalDescriptionDefined'),
    payload: type({
      journalId: input.JournalId,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalRankCalcEventDefined'),
    payload: type({
      journalId: input.JournalId,
      userEventType: map(t => t.type, UserEvent),
      factor: input.RankFactor,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalRankCalcEventRemoved'),
    payload: type({
      journalId: input.JournalId,
      userEventType: map(t => t.type, UserEvent),
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalRankCalcGroupDefined'),
    payload: type({
      journalId: input.JournalId,
      group: input.RankGroup,
      rankRange: input.RankRange,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalRankCalcGroupRemoved'),
    payload: type({
      journalId: input.JournalId,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalPrivilegeDefined'),
    payload: type({
      journalId: input.JournalId,
      privilege: input.JournalPrivilege,
      permission: input.JournalPermission,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalPrivilegeRemoved'),
    payload: type({
      journalId: input.JournalId,
      privilege: input.JournalPrivilege,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalStageRuleDefined'),
    payload: type({
      journalId: input.JournalId,
      stage: input.Stage,
      stageRule: input.StageRule,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalStageRuleRemoved'),
    payload: type({
      journalId: input.JournalId,
      stage: input.Stage,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalEditorAdded'),
    payload: type({
      journalId: input.JournalId,
      userId: input.UserId,
      editorInfo: input.UserInfo,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalEditorConfirmed'),
    payload: type({
      editorId: input.UserId,
      editorInfo: input.UserInfo,
      journalId: input.JournalId,
      timestamp: input.Timestamp
    })
  }),

  type({
    type: literal('JournalEditorRemoved'),
    payload: type({
      journalId: input.JournalId,
      userId: input.UserId,
      editorId: input.UserId,
      timestamp: input.Timestamp
    })
  })
])

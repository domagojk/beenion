import { type, literal, union, map } from 'io-ts'
import * as input from '../input'
import { UserEvent } from '../user/events'

export const JournalEvent = union([
  type({
    type: literal('JournalCreated'),
    journalId: input.JournalId,
    ownerId: input.UserId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalDeleted'),
    userId: input.UserId,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalTitleDefined'),
    journalId: input.JournalId,
    title: input.Title,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalDescriptionDefined'),
    journalId: input.JournalId,
    description: input.Description,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalRankCalcEventDefined'),
    journalId: input.JournalId,
    userEventType: map(t => t.type, UserEvent),
    factor: input.RankFactor,
    group: input.RankGroup,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalRankCalcEventRemoved'),
    journalId: input.JournalId,
    userEventType: map(t => t.type, UserEvent),
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalRankCalcGroupDefined'),
    journalId: input.JournalId,
    group: input.RankGroup,
    rankRange: input.RankRange,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalRankCalcGroupRemoved'),
    journalId: input.JournalId,
    group: input.RankGroup,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalPrivilegeDefined'),
    journalId: input.JournalId,
    privilege: input.JournalPrivilege,
    permission: input.JournalPermission,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalPrivilegeRemoved'),
    journalId: input.JournalId,
    privilege: input.JournalPrivilege,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalStageRuleDefined'),
    journalId: input.JournalId,
    stage: input.Stage,
    stageRule: input.StageRule,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalStageRuleRemoved'),
    journalId: input.JournalId,
    stage: input.Stage,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalEditorAdded'),
    journalId: input.JournalId,
    userId: input.UserId,
    editorInfo: input.UserInfo,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalEditorConfirmed'),
    editorId: input.UserId,
    editorInfo: input.UserInfo,
    journalId: input.JournalId,
    timestamp: input.Timestamp
  }),

  type({
    type: literal('JournalEditorRemoved'),
    journalId: input.JournalId,
    userId: input.UserId,
    editorId: input.UserId,
    timestamp: input.Timestamp
  })
])

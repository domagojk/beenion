import { UserEvent } from '../events'
import {
  JournalId,
  UserId,
  Title,
  Description,
  JournalPrivilege,
  JournalPermission,
  Stage,
  RankRange,
  StageRule,
  RankGroup,
  RankFactor,
  Timestamp
} from '../model'

export type JournalCreated = {
  type: 'JournalCreated'
  journalId: JournalId
  ownerId: UserId
  timestamp: Timestamp
}

export type JournalDeleted = {
  type: 'JournalDeleted'
  userId: UserId
  journalId: JournalId
  timestamp: Timestamp
}

export type JournalTitleDefined = {
  type: 'JournalTitleDefined'
  journalId: JournalId
  title: Title
  timestamp: Timestamp
}

export type JournalDescriptionDefined = {
  type: 'JournalDescriptionDefined'
  journalId: JournalId
  description: Description
  timestamp: Timestamp
}

export type JournalRankCalcEventDefined = {
  type: 'JournalRankCalcEventDefined'
  journalId: JournalId
  userEventType: UserEvent['type']
  factor: RankFactor
  group: RankGroup
  timestamp: Timestamp
}

export type JournalRankCalcEventRemoved = {
  type: 'JournalRankCalcEventRemoved'
  journalId: JournalId
  userEventType: UserEvent['type']
  timestamp: Timestamp
}

export type JournalRankCalcGroupDefined = {
  type: 'JournalRankCalcGroupDefined'
  journalId: JournalId
  group: RankGroup
  rankRange: RankRange
  timestamp: Timestamp
}

export type JournalRankCalcGroupRemoved = {
  type: 'JournalRankCalcGroupRemoved'
  journalId: JournalId
  group: RankGroup
  timestamp: Timestamp
}

export type JournalPrivilegeDefined = {
  type: 'JournalPrivilegeDefined'
  journalId: JournalId
  privilege: JournalPrivilege
  permission: JournalPermission
  timestamp: Timestamp
}

export type JournalPrivilegeRemoved = {
  type: 'JournalPrivilegeRemoved'
  journalId: JournalId
  privilege: JournalPrivilege
  timestamp: Timestamp
}

export type JournalStageRuleDefined = {
  type: 'JournalStageRuleDefined'
  journalId: JournalId
  stage: Stage
  stageRule: StageRule
  timestamp: Timestamp
}

export type JournalStageRuleRemoved = {
  type: 'JournalStageRuleRemoved'
  journalId: JournalId
  stage: Stage
  timestamp: Timestamp
}

export type JournalEditorAdded = {
  type: 'JournalEditorAdded'
  journalId: JournalId
  userId: UserId
  editorId: UserId
  timestamp: Timestamp
}

export type JournalEditorConfirmed = {
  type: 'JournalEditorConfirmed'
  journalId: JournalId
  editorId: UserId
  confirmedEditorId: UserId
  timestamp: Timestamp
}

export type JournalEditorRemoved = {
  type: 'JournalEditorRemoved'
  journalId: JournalId
  userId: UserId
  editorId: UserId
  timestamp: Timestamp
}

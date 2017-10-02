import { UserEvent } from 'domain/types/events'
import {
  PublicationId,
  UserId,
  Title,
  Description,
  PublicationPrivilege,
  PublicationPermission,
  Stage,
  RankRange,
  StageRule,
  RankGroup,
  RankFactor,
  Timestamp
} from 'domain/types/model'

export type PublicationCreated = {
  type: 'PublicationCreated'
  publicationId: PublicationId
  ownerId: UserId
  timestamp: Timestamp
}

export type PublicationDeleted = {
  type: 'PublicationDeleted'
  userId: UserId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type PublicationTitleDefined = {
  type: 'PublicationTitleDefined'
  publicationId: PublicationId
  title: Title
  timestamp: Timestamp
}

export type PublicationDescriptionDefined = {
  type: 'PublicationDescriptionDefined'
  publicationId: PublicationId
  description: Description
  timestamp: Timestamp
}

export type PublicationRankCalcEventDefined = {
  type: 'PublicationRankCalcEventDefined'
  publicationId: PublicationId
  userEventType: UserEvent['type']
  factor: RankFactor
  group: RankGroup
  timestamp: Timestamp
}

export type PublicationRankCalcEventRemoved = {
  type: 'PublicationRankCalcEventRemoved'
  publicationId: PublicationId
  userEventType: UserEvent['type']
  timestamp: Timestamp
}

export type PublicationRankCalcGroupDefined = {
  type: 'PublicationRankCalcGroupDefined'
  publicationId: PublicationId
  group: RankGroup
  rankRange: RankRange
  timestamp: Timestamp
}

export type PublicationRankCalcGroupRemoved = {
  type: 'PublicationRankCalcGroupRemoved'
  publicationId: PublicationId
  group: RankGroup
  timestamp: Timestamp
}

export type PublicationPrivilegeDefined = {
  type: 'PublicationPrivilegeDefined'
  publicationId: PublicationId
  privilege: PublicationPrivilege
  permission: PublicationPermission
  timestamp: Timestamp
}

export type PublicationPrivilegeRemoved = {
  type: 'PublicationPrivilegeRemoved'
  publicationId: PublicationId
  privilege: PublicationPrivilege
  timestamp: Timestamp
}

export type PublicationStageRuleDefined = {
  type: 'PublicationStageRuleDefined'
  publicationId: PublicationId
  stage: Stage
  stageRule: StageRule
  timestamp: Timestamp
}

export type PublicationStageRuleRemoved = {
  type: 'PublicationStageRuleRemoved'
  publicationId: PublicationId
  stage: Stage
  timestamp: Timestamp
}

export type PublicationEditorAdded = {
  type: 'PublicationEditorAdded'
  publicationId: PublicationId
  userId: UserId
  editorId: UserId
  timestamp: Timestamp
}

export type PublicationEditorConfirmed = {
  type: 'PublicationEditorConfirmed'
  publicationId: PublicationId
  editorId: UserId
  confirmedEditorId: UserId
  timestamp: Timestamp
}

export type PublicationEditorRemoved = {
  type: 'PublicationEditorRemoved'
  publicationId: PublicationId
  userId: UserId
  editorId: UserId
  timestamp: Timestamp
}

import {
  JournalId,
  UserInfo,
  StageRule,
  JournalPrivilege,
  JournalPermission,
  RankRange,
  UserEvent
} from '../index'

export type Journal = {
  journalId: JournalId
  privileges: JournalPrivilegeConditions
  rankCalcParams: RankCalcParams
  editors: {
    invited: UserInfo[]
    confirmed: UserInfo[]
  }
  stageRules: StageRule[]
}

export type JournalPrivilegeConditions = {
  [Privilege in JournalPrivilege]: JournalPermission
}

export type RankCalcParams = {
  events: {
    eventType: UserEvent['type']
    factor: number
    group: string
  }[]
  groups: {
    group: string
    rankRange: RankRange
  }[]
}

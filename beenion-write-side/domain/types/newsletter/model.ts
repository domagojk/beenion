import {
  NewsletterId,
  UserInfo,
  StageRule,
  NewsletterPrivilege,
  NewsletterPermission,
  RankRange,
  UserEvent
} from '../index'

export type Newsletter = {
  newsletterId: NewsletterId
  privileges: NewsletterPrivilegeConditions
  rankCalcParams: RankCalcParams
  editors: {
    invited: UserInfo[]
    confirmed: UserInfo[]
  }
  stageRules: StageRule[]
}

export type NewsletterPrivilegeConditions = {
  [Privilege in NewsletterPrivilege]: NewsletterPermission
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

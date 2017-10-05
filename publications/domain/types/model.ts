import { UserEvent } from './events'

// basic types
// intersection with { kind: Type } creates nominal type in Typescript
// https://github.com/Microsoft/TypeScript/issues/202
export type UserId = string & { kind: 'UserId' }
export type ProjectId = string & { kind: 'ProjectId' }
export type PublicationId = string & { kind: 'PublicationId' }
export type Title = string & { kind: 'Title' }
export type Description = string & { kind: 'Description' }
export type URL = string & { kind: 'URL' }
export type RankGroup = string & { kind: 'RankGroup' }
export type RankFactor = number & { kind: 'RankFactor' }
export type Timestamp = number & { kind: 'Timestamp' }

// union types
export type Evaluation = 'approve' | 'reject'
export type Medal = 'gold' | 'silver' | 'bronze'
export type Rating = 'upvote' | 'downvote'
export type Stage = 0 | 1 | 2 | 3 | 4

export type PublicationPrivilege =
  | 'canUpdatePublication'
  | 'canUpdatePrivilege'
  | 'canUpdateRankCalcParams'
  | 'canUpdateStageRules'
  | 'canUpdateEditor'
  | 'canDeletePublication'
  | 'canReviewInStage0'
  | 'canReviewInStage1'
  | 'canReviewInStage2'
  | 'canReviewInStage3'
  | 'canReviewInStage4'
  | 'canCreateProject'
  | 'canDeleteProject'
  | 'canRejectApprovedProject'
  | 'canBanProject'
  | 'canUpdateProject'
  | 'canResubmitProject'
  | 'canVoteWithGold'
  | 'canVoteWithSilver'
  | 'canVoteWithBronze'

export type BeenionPrivilege =
  | 'canCreatePublication'
  | 'canDeletePublication'
  | 'canVoteWithGold'
  | 'canVoteWithSilver'
  | 'canVoteWithBronze'

// object types
export type RankRange = {
  min: number
  max?: number
}

export type RankEvent = {
  category: 'ProjectVotes' | 'ReviewVotes' | 'UserVotes' | 'UserEvents'
  eventType: UserEvent['type']
  publicationId?: PublicationId
  projectId?: ProjectId
  voterId?: UserId
}

export type PublicationPermission = {
  publicationRank?: RankRange
  beenionRank?: RankRange
  users?: UserId[]
}

export type BeenionPermission = {
  beenionRank?: RankRange
  users?: UserId[]
}

export type PublicationPrivilegeConditions = {
  [Privilege in PublicationPrivilege]: PublicationPermission
}

export type BeenionPrivilegeConditions = {
  [Privilege in BeenionPrivilege]: BeenionPermission
}

export type StageRule = {
  maxReviewers: number
  threshold: number
}

export type RankCalcParams = {
  events: {
    eventType: UserEvent['type']
    factor: RankFactor
    group: RankGroup
  }[]
  groups: {
    group: RankGroup
    rankRange: RankRange
  }[]
}

// projections reduced from event history
export type Project = {
  projectId: ProjectId
  ownerId: UserId
  stageRules: StageRule[]
  currentStage: number
  lastStage: Stage
  reviewers: UserId[]
  evaluations: {
    reviewerId: UserId
    evaluation: Evaluation
  }[]
  reviewProcessCompleted: boolean
  approved: boolean
  banned: boolean
}

export type Publication = {
  publicationId: PublicationId
  privilegeConditions: PublicationPrivilegeConditions
  rankCalcParams: RankCalcParams
  editors: {
    invited: UserId[]
    confirmed: UserId[]
  }
  stageRules: StageRule[]
}

export type User = {
  userId: UserId
  mergedUserIds: UserId[]
  rankEvents: RankEvent[]
}

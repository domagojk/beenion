import { UserEvent } from './events'

// basic types
// intersection with { kind: Type } creates nominal type in Typescript
// https://github.com/Microsoft/TypeScript/issues/202
export type UserId = string & { kind: 'UserId' }
export type ArticleId = string & { kind: 'ArticleId' }
export type JournalId = string & { kind: 'JournalId' }
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

export type JournalPrivilege =
  | 'canUpdateJournal'
  | 'canUpdatePrivilege'
  | 'canUpdateRankCalcParams'
  | 'canUpdateStageRules'
  | 'canUpdateEditor'
  | 'canDeleteJournal'
  | 'canReviewInStage0'
  | 'canReviewInStage1'
  | 'canReviewInStage2'
  | 'canReviewInStage3'
  | 'canReviewInStage4'
  | 'canCreateArticle'
  | 'canDeleteArticle'
  | 'canRejectApprovedArticle'
  | 'canBanArticle'
  | 'canUpdateArticle'
  | 'canResubmitArticle'
  | 'canVoteWithGold'
  | 'canVoteWithSilver'
  | 'canVoteWithBronze'

export type BeenionPrivilege =
  | 'canCreateJournal'
  | 'canDeleteJournal'
  | 'canVoteWithGold'
  | 'canVoteWithSilver'
  | 'canVoteWithBronze'

// object types
export type RankRange = {
  min: number
  max?: number
}

export type RankEvent = {
  category: 'ArticleVotes' | 'ReviewVotes' | 'UserVotes' | 'UserEvents'
  eventType: UserEvent['type']
  journalId?: JournalId
  articleId?: ArticleId
  voterId?: UserId
}

export type JournalPermission = {
  journalRank?: RankRange
  beenionRank?: RankRange
  users?: UserId[]
}

export type BeenionPermission = {
  beenionRank?: RankRange
  users?: UserId[]
}

export type JournalPrivilegeConditions = {
  [Privilege in JournalPrivilege]: JournalPermission
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
export type Article = {
  articleId: ArticleId
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

export type Journal = {
  journalId: JournalId
  privilegeConditions: JournalPrivilegeConditions
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

import { UserEvent } from './events'

export type Timestamp = number

export type UUID = string

export type URL = string

export type Title = string

export type Description = string

export type Username = string

export type Evaluation = 'approve' | 'reject'

export type PrivilegeConditions = {
  beenionRank: number
  publicationRank?: number
  userAccessList?: UUID[]
}

export type RankConditions = {
  events: {
    [event in UserEvent['type']]?: {
      factor: number,
      group: string
    }
  },
  groups: {
    [key: string]: {
      min: number,
      max: number
    }
  }
}

export type PublicationPrivileges = {
  canUpdatePublication: PrivilegeConditions
  canDeletePublication: PrivilegeConditions
  canCreateProject: PrivilegeConditions
  canDeleteProject: PrivilegeConditions
  canBanProject: PrivilegeConditions
  canUpdateProject: PrivilegeConditions
  canResubmitProject: PrivilegeConditions
  canVoteWithGold: PrivilegeConditions
  canVoteWithSilver: PrivilegeConditions
  canVoteWithBronze: PrivilegeConditions
}

export type BeenionPrivileges = {
  canCreatePublication: PrivilegeConditions
  canDeletePublication: PrivilegeConditions
  canVoteWithGold: PrivilegeConditions
  canVoteWithSilver: PrivilegeConditions
  canVoteWithBronze: PrivilegeConditions
}

export type EventAnalytics = {
  [event in UserEvent['type']]?: number
}

export type ProjectStageRules = {
  maxReviewers: number
  threshold: number
  canReview: PrivilegeConditions
}

export type Project = {
  projectId: UUID
  ownerId: UUID
  stageRules: ProjectStageRules[]
  currentStage: number
  reviewers: UUID[]
  evaluations: {
    reviewerId: UUID
    evaluation: Evaluation
  }[]
  reviewProcessCompleted: boolean
  approved: boolean
  banned: boolean
}

export type Publication = {
  publicationId: UUID
  privileges: PublicationPrivileges
  rankConditions: RankConditions
  projectStageRules: ProjectStageRules[]
}

export type User = {
  userId: UUID
  beenionAnalytics: EventAnalytics
  publicationAnalytics: {
    [publicationId: string]: EventAnalytics
  }
}

export type Timestamp = number

export type UUID = string

export type URL = string

export type Title = string

export type Description = string

export type Username = string

export type Evaluation = 'accept' | 'reject'

export type Permission = {
  beenionRank: number
  publicationRank?: number
  userList?: UUID[]
}

export type PublicationPrivileges = {
  canUpdatePublication: Permission
  canDeletePublication: Permission
  canCreateProject: Permission
  canDeleteProject: Permission
  canPublishProject: Permission
  canBanProject: Permission
  canUpdateProject: Permission
  canResubmitProject: Permission
  canVoteWithGold: Permission
  canVoteWithSilver: Permission
  canVoteWithBronze: Permission
}

export type BeenionPrivileges = {
  canCreatePublication: Permission
  canDeletePublication: Permission
  canVoteWithGold: Permission
  canVoteWithSilver: Permission
  canVoteWithBronze: Permission
}

export type PublicationRankMetric =
  | 'ReviewInvitationAccepted'
  | 'ReviewInvitationDeclined'
  | 'ReviewInvitationExpired'
  | 'ProjectUpvotedWithGold'
  | 'ProjectUpvotedWithSilver'
  | 'ProjectUpvotedWithBronze'
  | 'ProjectDownvotedWithGold'
  | 'ProjectDownvotedWithSilver'
  | 'ProjectDownvotedWithBronze'
  | 'ReviewUpvotedWithGold'
  | 'ReviewUpvotedWithSilver'
  | 'ReviewUpvotedWithBronze'
  | 'ReviewDownvotedWithGold'
  | 'ReviewDownvotedWithSilver'
  | 'ReviewDownvotedWithBronze'

export type BeenionRankMetric =
  | 'UserUpvotedWithGold'
  | 'UserUpvotedWithSilver'
  | 'UserUpvotedWithBronze'
  | 'UserDownvotedWithGold'
  | 'UserDownvotedWithSilver'
  | 'UserDownvotedWithBronze'

export type PublicationRankConditions = {
  [metric in PublicationRankMetric]: {
    factor: number
    min: number
    max: number
  }
}

export type BeenionRankConditions = {
  [metric in BeenionRankMetric]: {
    factor: number
    min: number
    max: number
  }
}

export type ProjectStageRules = {
  maxReviewers: number
  threshold: number
  canReview: Permission
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
  banned: boolean
}

export type Publication = {
  publicationId: UUID
  privileges: PublicationPrivileges
  rankConditions: PublicationRankConditions
  projectStageRules: ProjectStageRules[]
}

export type User = {
  userId: UUID
  beenionAnalytics: {
    [metric in BeenionRankMetric]: number
  }
  publicationAnalytics: {
    [publicationId: string]: {
      [metric in PublicationRankMetric]: number
    }
  }
}

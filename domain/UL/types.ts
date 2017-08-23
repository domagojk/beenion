import * as ProjectEvents from './events/projectEvents'
import * as PublicationEvents from './events/publicationEvents'
import * as UserEvents from './events/userEvents'

export type Timestamp = number
export type UUID = string
export type URL = string
export type Title = string
export type Username = string
export type Description = string
export type Evaluation = 'accept' | 'reject'
export type PublicationStageRule = {
  maxReviewers: number
  threshold: number
  canReview: number
}

export type Project = {
  projectId: UUID
  ownerId: UUID
  stages: PublicationStageRule[]
  currentStage: number
  inFinalStage: boolean
  rules: PublicationStageRule
  reviewers: Array<UUID>
  evaluations: {
    reviewerId: UUID
    evaluation: Evaluation
  }[]
}

export type Publication = {
  publicationId: UUID
  userRankingFactors: {
    [prop in UserEvent['type']]?: {
      factor: number
      min?: number
      max?: number
    }
  }
  privileges: {
    canCreateProject: number
    canDeleteProject: number
    canPublishProject: number
    canUpdateProjectInfo: number
    canResubmitProject: number
    canFlagSpammer: number
    canFlagEditor: number
    canUnflagSpammer: number
    canUnflagEditor: number
    canAwardGold: number
    canAwardSilver: number
    canAwardBronze: number
    canAwardWood: number
    canAwardPlastic: number
    canAwardPaper: number
  }
  stages: PublicationStageRule[]
}

export type Member = {
  userId: UUID
  username: Username
  publicationRank: number
}

export type ProjectEvent =
  | ProjectEvents.ProjectCreated
  | ProjectEvents.ProjectDeleted
  | ProjectEvents.ProjectDescriptionUpdated
  | ProjectEvents.ProjectLinkUpdated
  | ProjectEvents.ProjectTitleUpdated
  | ProjectEvents.ProjectPromoted
  | ProjectEvents.ProjectResubmitted
  | ProjectEvents.ProjectReviewerInvited
  | ProjectEvents.ProjectReviewerInvitationAccepted
  | ProjectEvents.ProjectReviewerInvitationRejected
  | ProjectEvents.ProjectReviewerInvitationExpired
  | ProjectEvents.ProjectReviewed
  | ProjectEvents.ProjectAccepted
  | ProjectEvents.ProjectRejected

export type PublicationEvent =
  | PublicationEvents.PublicationCreated
  | PublicationEvents.PublicationConditionsUpdated
  | PublicationEvents.PublicationDeleted
  | PublicationEvents.PublicationTitleUpdated
  | PublicationEvents.PublicationDescriptionUpdated

export type UserEvent =
  | UserEvents.UserFlaggedAsEditor
  | UserEvents.UserUnflaggedAsEditor
  | UserEvents.UserFlaggedAsSpammer
  | UserEvents.UserUnflaggedAsSpammer
  | UserEvents.UserProjectAccepted
  | UserEvents.UserProjectRejected
  | UserEvents.UserReviewMarkedAsHelpful
  | UserEvents.UserReviewMarkedAsUnhelpful
  | UserEvents.UserReviewAwardedWithGold
  | UserEvents.UserReviewAwardedWithSilver
  | UserEvents.UserReviewAwardedWithBronze
  | UserEvents.UserReviewAwardedWithWood
  | UserEvents.UserReviewAwardedWithPlastic
  | UserEvents.UserReviewAwardedWithPaper

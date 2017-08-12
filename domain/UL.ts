export type Timestamp = number
export type UserId = number
export type UUID = string
export type URL = string
export type Title = string
export type Describtion = string
export type ProjectReview = 'accept' | 'reject'
export type User = {
  id: UserId
  username: string
  beenionRank: number
}
export type Reviewer = {
  id: UserId
  username: string
  beenionRank: number
  publicationRank: number
}
export type PublicationCondition =
  | {
    type: 'BeenionRank'
    rank: number
    threshold: number
  }
  | {
    type: 'PublicationRank'
    rank: number
    threshold: number
  }
  | {
    type: 'SpecificReviewers'
    reviewers: UserId[]
    threshold: number
  }
export type ProjectEvent =
  | ProjectCreated
  | ProjectDeleted
  | ProjectDescriptionUpdated
  | ProjectLinkUpdated
  | ProjectTitleUpdated
  | ProjectPromoted
  | ProjectResubmitted
  | ProjectReviewerInvited
  | ProjectReviewerInvitationAccepted
  | ProjectReviewerInvitationRejected
  | ProjectReviewerInvitationExpired
  | ProjectReviewed
  | ProjectAccepted
  | ProjectDeclined
export type PublicationEvent =
  | PublicationCreated
  | PublicationConditionsUpdated
  | PublicationDeleted
  | PublicationTitleUpdated
  | PublicationDescriptionUpdated
export type DomainEvent =
  | ProjectEvent
  | PublicationEvent
//
// Event Types
//
export type ProjectCreated = {
  type: 'ProjectCreated'
  projectId: UUID
  publicationId: UUID
  publicationConditions: PublicationCondition[]
  owner: User
  title: Title
  description: Describtion
  link: URL
  timestamp: Timestamp
}
export type ProjectDeleted = {
  type: 'ProjectDeleted'
  projectId: UUID
  timestamp: Timestamp
}
export type ProjectDescriptionUpdated = {
  type: 'ProjectDescriptionUpdated'
  projectId: UUID
  description: Describtion
  timestamp: Timestamp
}
export type ProjectLinkUpdated = {
  type: 'ProjectLinkUpdated'
  projectId: UUID
  link: URL
  timestamp: Timestamp
}
export type ProjectTitleUpdated = {
  type: 'ProjectTitleUpdated'
  projectId: UUID
  title: Title
  timestamp: Timestamp
}
export type ProjectPromoted = {
  type: 'ProjectPromoted'
  projectId: UUID
  timestamp: Timestamp
}
export type ProjectResubmitted = {
  type: 'ProjectResubmitted'
  projectId: UUID
  timestamp: Timestamp
}
export type ProjectReviewerInvited = {
  type: 'ProjectReviewerInvited'
  projectId: UUID
  reviewer: Reviewer
  timestamp: Timestamp
}
export type ProjectReviewerInvitationAccepted = {
  type: 'ProjectReviewerInvitationAccepted'
  projectId: UUID
  reviewer: User
  timestamp: Timestamp
}
export type ProjectReviewerInvitationRejected = {
  type: 'ProjectReviewerInvitationRejected'
  projectId: UUID
  reviewer: User
  timestamp: Timestamp
}
export type ProjectReviewerInvitationExpired = {
  type: 'ProjectReviewerInvitationExpired'
  projectId: UUID
  reviewer: User
  timestamp: Timestamp
}
export type ProjectReviewed = {
  type: 'ProjectReviewed'
  projectId: UUID
  reviewer: User
  review: ProjectReview
  timestamp: Timestamp
}
export type ProjectAccepted = {
  type: 'ProjectAccepted'
  projectId: UUID
  timestamp: Timestamp
}
export type ProjectDeclined = {
  type: 'ProjectDeclined'
  projectId: UUID
  timestamp: Timestamp
}
export type PublicationCreated = {
  type: 'PublicationCreated'
  publicationId: UUID
  owner: User
  title: Title
  description: Describtion
  conditions: PublicationCondition[]
  timestamp: Timestamp
}
export type PublicationDeleted = {
  type: 'PublicationDeleted'
  publicationId: UUID
  timestamp: Timestamp
}
export type PublicationTitleUpdated = {
  type: 'PublicationTitleUpdated'
  publicationId: UUID
  title: Title
  timestamp: Timestamp
}
export type PublicationDescriptionUpdated = {
  type: 'PublicationDescriptionUpdated'
  publicationId: UUID
  describtion: Describtion
  timestamp: Timestamp
}
export type PublicationConditionsUpdated = {
  type: 'PublicationConditionsUpdated'
  publicationId: UUID
  conditions: PublicationCondition[]
  timestamp: Timestamp
}
//
// Command Types
//
export type CreateProject = {
  projectId: UUID
  publicationId: UUID
  publicationHistory: PublicationEvent[]
  owner: User
  title: Title
  description: Describtion
  link: URL
  timestamp: Timestamp
}
export type DeleteProject = {
  projectId: UUID
  timestamp: Timestamp
}
export type InviteProjectReviewer = {
  projectId: UUID
  projectHistory: ProjectEvent[]
  reviewer: Reviewer
  timestamp: Timestamp
}
export type PromoteProject = {
  projectId: UUID
  projectHistory: ProjectEvent[]
  timestamp: Timestamp
}
export type ReviewProject = {
  projectId: UUID
  projectHistory: ProjectEvent[]
  reviewer: Reviewer
  review: ProjectReview
  timestamp: Timestamp
}
export type UpdateProjectTitle = {
  projectId: UUID
  title: Title
  timestamp: Timestamp
}
export type UpdateProjectDescription = {
  projectId: UUID
  description: Describtion
  timestamp: Timestamp
}
export type UpdateProjectLink = {
  projectId: UUID
  link: URL
  timestamp: Timestamp
}
export type AcceptProject = {
  projectId: UUID
  timestamp: Timestamp
}
export type DeclineProject = {
  projectId: UUID
  timestamp: Timestamp
}
export type CreatePublication = {
  publicationId: UUID
  owner: User
  title: Title
  description: Describtion
  conditions: PublicationCondition[]
  timestamp: Timestamp
}
export type DeletePublication = {
  publicationId: UUID
  timestamp: Timestamp
}
export type UpdatePublicationTitle = {
  publicationId: UUID
  title: Title
  timestamp: Timestamp
}
export type UpdatePublicationDescription = {
  publicationId: UUID
  describtion: Describtion
  timestamp: Timestamp
}
export type UpdatePublicationConditions = {
  publicationId: UUID
  publicationHistory: PublicationEvent[]
  conditions: PublicationCondition[]
  timestamp: Timestamp
}

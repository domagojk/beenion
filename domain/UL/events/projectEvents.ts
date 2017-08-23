import { UUID, PublicationStageRule, Timestamp, URL, Evaluation } from 'domain/UL/types'

export type ProjectCreated = {
  type: 'ProjectCreated'
  projectId: UUID
  publicationId: UUID
  stages: PublicationStageRule[]
  ownerId: UUID
  title: string
  description: string
  link: URL
  timestamp: Timestamp
}

export type ProjectDeleted = {
  type: 'ProjectDeleted'
  projectId: UUID
  userId: UUID
  timestamp: Timestamp
}

export type ProjectDescriptionUpdated = {
  type: 'ProjectDescriptionUpdated'
  projectId: UUID
  description: string
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
  title: string
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

export type ProjectReviewerInviteFailed = {
  type: 'ProjectReviewerInviteFailed'
  projectId: UUID
  reviewerId: UUID
  timestamp: Timestamp
}

export type ProjectReviewerInvited = {
  type: 'ProjectReviewerInvited'
  projectId: UUID
  reviewerId: UUID
  timestamp: Timestamp
}

export type ProjectReviewerInvitationAccepted = {
  type: 'ProjectReviewerInvitationAccepted'
  projectId: UUID
  reviewerId: UUID
  timestamp: Timestamp
}

export type ProjectReviewerInvitationRejected = {
  type: 'ProjectReviewerInvitationRejected'
  projectId: UUID
  reviewerId: UUID
  timestamp: Timestamp
}

export type ProjectReviewerInvitationExpired = {
  type: 'ProjectReviewerInvitationExpired'
  projectId: UUID
  reviewerId: UUID
  timestamp: Timestamp
}

export type ProjectReviewed = {
  type: 'ProjectReviewed'
  projectId: UUID
  reviewerId: UUID
  evaluation: Evaluation
  timestamp: Timestamp
}

export type ProjectAccepted = {
  type: 'ProjectAccepted'
  projectId: UUID
  timestamp: Timestamp
}

export type ProjectRejected = {
  type: 'ProjectRejected'
  projectId: UUID
  timestamp: Timestamp
}

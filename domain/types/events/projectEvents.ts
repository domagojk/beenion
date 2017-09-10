import {
  UUID,
  ProjectStageRules,
  Timestamp,
  Title,
  Description,
  URL,
  Evaluation
} from 'domain/types/model'

export type ProjectCreated = {
  type: 'ProjectCreated'
  projectId: UUID
  publicationId: UUID
  stageRules: ProjectStageRules[]
  ownerId: UUID
  title: Title
  description: Description
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
  description: Description
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

export type ProjectApproved = {
  type: 'ProjectApproved'
  projectId: UUID
  timestamp: Timestamp
}

export type ProjectRejected = {
  type: 'ProjectRejected'
  projectId: UUID
  timestamp: Timestamp
}

export type ProjectResubmitted = {
  type: 'ProjectResubmitted'
  projectId: UUID
  stageRules: ProjectStageRules[]
  timestamp: Timestamp
}

export type ProjectReviewerInvited = {
  type: 'ProjectReviewerInvited'
  projectId: UUID
  reviewerId: UUID
  timestamp: Timestamp
}

export type ProjectReviewerInviteFailed = {
  type: 'ProjectReviewerInviteFailed'
  projectId: UUID
  reviewerId: UUID
  timestamp: Timestamp
}

export type ProjectReviewerRemoved = {
  type: 'ProjectReviewerRemoved'
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

export type ProjectBanned = {
  type: 'ProjectBanned'
  userId: UUID
  projectId: UUID
  timestamp: Timestamp
}

export type ProjectUnbanned = {
  type: 'ProjectUnbanned'
  userId: UUID
  projectId: UUID
  timestamp: Timestamp
}

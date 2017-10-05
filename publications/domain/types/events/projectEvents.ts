import {
  UserId,
  ProjectId,
  PublicationId,
  StageRule,
  Timestamp,
  Title,
  Description,
  URL,
  Evaluation
} from 'domain/types/model'

export type ProjectCreated = {
  type: 'ProjectCreated'
  projectId: ProjectId
  publicationId: PublicationId
  ownerId: UserId
  timestamp: Timestamp
}

export type ProjectDeleted = {
  type: 'ProjectDeleted'
  projectId: ProjectId
  userId: UserId
  timestamp: Timestamp
}

export type ProjectStageRulesDefined = {
  type: 'ProjectStageRulesDefined'
  projectId: ProjectId
  stageRules: StageRule[]
  timestamp: Timestamp
}

export type ProjectDescriptionDefined = {
  type: 'ProjectDescriptionDefined'
  projectId: ProjectId
  description: Description
  timestamp: Timestamp
}

export type ProjectLinkDefined = {
  type: 'ProjectLinkDefined'
  projectId: ProjectId
  link: URL
  timestamp: Timestamp
}

export type ProjectTitleDefined = {
  type: 'ProjectTitleDefined'
  projectId: ProjectId
  title: Title
  timestamp: Timestamp
}

export type ProjectPromoted = {
  type: 'ProjectPromoted'
  userId: UserId
  projectId: ProjectId
  timestamp: Timestamp
}

export type ProjectApproved = {
  type: 'ProjectApproved'
  userId: UserId
  projectId: ProjectId
  timestamp: Timestamp
}

export type ProjectRejected = {
  type: 'ProjectRejected'
  userId: UserId
  projectId: ProjectId
  timestamp: Timestamp
}

export type ApprovedProjectRejected = {
  type: 'ApprovedProjectRejected'
  userId: UserId
  projectId: ProjectId
  timestamp: Timestamp
}

export type ProjectResubmitted = {
  type: 'ProjectResubmitted'
  projectId: ProjectId
  timestamp: Timestamp
}

export type ProjectReviewerInvited = {
  type: 'ProjectReviewerInvited'
  projectId: ProjectId
  reviewerId: UserId
  timestamp: Timestamp
}

export type ProjectReviewerRemoved = {
  type: 'ProjectReviewerRemoved'
  projectId: ProjectId
  reviewerId: UserId
  timestamp: Timestamp
}

export type ProjectReviewed = {
  type: 'ProjectReviewed'
  projectId: ProjectId
  reviewerId: UserId
  evaluation: Evaluation
  timestamp: Timestamp
}

export type ProjectBanned = {
  type: 'ProjectBanned'
  userId: UserId
  projectId: ProjectId
  timestamp: Timestamp
}

export type ProjectUnbanned = {
  type: 'ProjectUnbanned'
  userId: UserId
  projectId: ProjectId
  timestamp: Timestamp
}

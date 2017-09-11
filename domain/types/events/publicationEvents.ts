import {
  UUID,
  Title,
  Description,
  ProjectStageRules,
  PublicationPrivileges,
  RankConditions,
  Timestamp
} from 'domain/types/model'

export type PublicationCreated = {
  type: 'PublicationCreated'
  publicationId: UUID
  ownerId: UUID
  title: Title
  description: Description
  privileges: PublicationPrivileges
  rankConditions: RankConditions
  projectStageRules: ProjectStageRules[]
  timestamp: Timestamp
}

export type PublicationDeleted = {
  type: 'PublicationDeleted'
  userId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type PublicationTitleUpdated = {
  type: 'PublicationTitleUpdated'
  publicationId: UUID
  title: string
  timestamp: Timestamp
}

export type PublicationRankConditionsUpdated = {
  type: 'PublicationRankConditionsUpdated'
  publicationId: UUID
  rankConditions: RankConditions
  timestamp: Timestamp
}

export type PublicationDescriptionUpdated = {
  type: 'PublicationDescriptionUpdated'
  publicationId: UUID
  description: Description
  timestamp: Timestamp
}

export type ProjectStageRulesUpdated = {
  type: 'ProjectStageRulesUpdated'
  publicationId: UUID
  projectStageRules: ProjectStageRules[]
  timestamp: Timestamp
}

import { UUID, PublicationStageRule, Timestamp } from 'domain/UL/types'

export type PublicationCreated = {
  type: 'PublicationCreated'
  publicationId: UUID
  ownerId: UUID
  title: string
  description: string
  conditions: PublicationStageRule[]
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
  title: string
  timestamp: Timestamp
}

export type PublicationDescriptionUpdated = {
  type: 'PublicationDescriptionUpdated'
  publicationId: UUID
  describtion: string
  timestamp: Timestamp
}

export type PublicationConditionsUpdated = {
  type: 'PublicationConditionsUpdated'
  publicationId: UUID
  conditions: PublicationStageRule[]
  timestamp: Timestamp
}

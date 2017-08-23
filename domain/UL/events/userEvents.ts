import { UUID } from 'domain/UL/types'

export type UserCreated = {
  type: 'UserCreated'
  userId: UUID
  username: string
}

export type UserFlaggedAsEditor = {
  type: 'UserFlaggedAsEditor'
  initiatorId: UUID
  userId: UUID
  publicationId: UUID
}

export type UserUnflaggedAsEditor = {
  type: 'UserUnflaggedAsEditor'
  initiatorId: UUID
  userId: UUID
  publicationId: UUID
}

export type UserFlaggedAsSpammer = {
  type: 'UserFlaggedAsSpammer'
  initiatorId: UUID
  userId: UUID
  publicationId: UUID
}

export type UserUnflaggedAsSpammer = {
  type: 'UserUnflaggedAsSpammer'
  initiatorId: UUID
  userId: UUID
  publicationId: UUID
}

export type UserProjectAccepted = {
  type: 'UserProjectAccepted'
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserProjectRejected = {
  type: 'UserProjectRejected'
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewMarkedAsHelpful = {
  type: 'UserReviewMarkedAsHelpful'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewMarkedAsUnhelpful = {
  type: 'UserReviewMarkedAsUnhelpful'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewAwardedWithGold = {
  type: 'UserReviewAwardedWithGold'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewAwardedWithSilver = {
  type: 'UserReviewAwardedWithSilver'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewAwardedWithBronze = {
  type: 'UserReviewAwardedWithBronze'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewAwardedWithWood = {
  type: 'UserReviewAwardedWithWood'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewAwardedWithPlastic = {
  type: 'UserReviewAwardedWithPlastic'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

export type UserReviewAwardedWithPaper = {
  type: 'UserReviewAwardedWithPaper'
  initiatorId: UUID
  userId: UUID
  project: UUID
  publicationId: UUID
}

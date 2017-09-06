import { UUID, Timestamp } from 'domain/types/model'

export type UserCreated = {
  type: 'UserCreated'
  userId: UUID
  username: string
  timestamp: Timestamp
}

export type ReviewInvitationAccepted = {
  type: 'ReviewInvitationAccepted'
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ReviewInvitationDeclined = {
  type: 'ReviewInvitationDeclined'
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ReviewInvitationExpired = {
  type: 'ReviewInvitationExpired'
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ReviewUpvotedWithGold = {
  type: 'ReviewUpvotedWithGold'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  reviewId: UUID
  timestamp: Timestamp
}

export type ReviewUpvotedWithSilver = {
  type: 'ReviewUpvotedWithSilver'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  reviewId: UUID
  timestamp: Timestamp
}

export type ReviewUpvotedWithBronze = {
  type: 'ReviewUpvotedWithBronze'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  reviewId: UUID
  timestamp: Timestamp
}

export type ReviewDownvotedWithGold = {
  type: 'ReviewDownvotedWithGold'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  reviewId: UUID
  timestamp: Timestamp
}

export type ReviewDownvotedWithSilver = {
  type: 'ReviewDownvotedWithSilver'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  reviewId: UUID
  timestamp: Timestamp
}

export type ReviewDownvotedWithBronze = {
  type: 'ReviewDownvotedWithBronze'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  reviewId: UUID
  timestamp: Timestamp
}

export type ProjectUpvotedWithGold = {
  type: 'ProjectUpvotedWithGold'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ProjectUpvotedWithSilver = {
  type: 'ProjectUpvotedWithSilver'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ProjectUpvotedWithBronze = {
  type: 'ProjectUpvotedWithBronze'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ProjectDownvotedWithGold = {
  type: 'ProjectDownvotedWithGold'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ProjectDownvotedWithSilver = {
  type: 'ProjectDownvotedWithSilver'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type ProjectDownvotedWithBronze = {
  type: 'ProjectDownvotedWithBronze'
  voterId: UUID
  userId: UUID
  projectId: UUID
  publicationId: UUID
  timestamp: Timestamp
}

export type UserUpvotedWithGold = {
  type: 'UserUpvotedWithGold'
  voterId: UUID
  userId: UUID
  timestamp: Timestamp
}

export type UserUpvotedWithSilver = {
  type: 'UserUpvotedWithSilver'
  voterId: UUID
  userId: UUID
  timestamp: Timestamp
}

export type UserUpvotedWithBronze = {
  type: 'UserUpvotedWithBronze'
  voterId: UUID
  userId: UUID
  timestamp: Timestamp
}

export type UserDownvotedWithGold = {
  type: 'UserDownvotedWithGold'
  voterId: UUID
  userId: UUID
  timestamp: Timestamp
}

export type UserDownvotedWithSilver = {
  type: 'UserDownvotedWithSilver'
  voterId: UUID
  userId: UUID
  timestamp: Timestamp
}

export type UserDownvotedWithBronze = {
  type: 'UserDownvotedWithBronze'
  voterId: UUID
  userId: UUID
  timestamp: Timestamp
}

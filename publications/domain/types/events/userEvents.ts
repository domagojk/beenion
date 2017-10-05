import { UserId, ProjectId, PublicationId, Timestamp } from 'domain/types/model'

export type UserCreated = {
  type: 'UserCreated'
  userId: UserId
  timestamp: Timestamp
}

// due to twitter (and other kinds) invitations
// there is posibility for a user to have multiple accounts.
// UserAccountMerged event connects them together.
export type UserAccountMerged = {
  type: 'UserAccountMerged',
  originalUserId: UserId
  mergedUserId: UserId
  timestamp: Timestamp
}

export type ReviewInvitationDeclined = {
  type: 'ReviewInvitationDeclined'
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewInvitationExpired = {
  type: 'ReviewInvitationExpired'
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewUpvotedWithGold = {
  type: 'ReviewUpvotedWithGold'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewUpvotedWithSilver = {
  type: 'ReviewUpvotedWithSilver'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewUpvotedWithBronze = {
  type: 'ReviewUpvotedWithBronze'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewDownvotedWithGold = {
  type: 'ReviewDownvotedWithGold'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewDownvotedWithSilver = {
  type: 'ReviewDownvotedWithSilver'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewDownvotedWithBronze = {
  type: 'ReviewDownvotedWithBronze'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ReviewVoteWithdrawn = {
  type: 'ReviewVoteWithdrawn'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ProjectUpvotedWithGold = {
  type: 'ProjectUpvotedWithGold'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ProjectUpvotedWithSilver = {
  type: 'ProjectUpvotedWithSilver'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ProjectUpvotedWithBronze = {
  type: 'ProjectUpvotedWithBronze'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ProjectDownvotedWithGold = {
  type: 'ProjectDownvotedWithGold'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ProjectDownvotedWithSilver = {
  type: 'ProjectDownvotedWithSilver'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ProjectDownvotedWithBronze = {
  type: 'ProjectDownvotedWithBronze'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type ProjectVoteWithdrawn = {
  type: 'ProjectVoteWithdrawn'
  voterId: UserId
  userId: UserId
  projectId: ProjectId
  publicationId: PublicationId
  timestamp: Timestamp
}

export type UserUpvotedWithGold = {
  type: 'UserUpvotedWithGold'
  voterId: UserId
  userId: UserId
  timestamp: Timestamp
}

export type UserUpvotedWithSilver = {
  type: 'UserUpvotedWithSilver'
  voterId: UserId
  userId: UserId
  timestamp: Timestamp
}

export type UserUpvotedWithBronze = {
  type: 'UserUpvotedWithBronze'
  voterId: UserId
  userId: UserId
  timestamp: Timestamp
}

export type UserDownvotedWithGold = {
  type: 'UserDownvotedWithGold'
  voterId: UserId
  userId: UserId
  timestamp: Timestamp
}

export type UserDownvotedWithSilver = {
  type: 'UserDownvotedWithSilver'
  voterId: UserId
  userId: UserId
  timestamp: Timestamp
}

export type UserDownvotedWithBronze = {
  type: 'UserDownvotedWithBronze'
  voterId: UserId
  userId: UserId
  timestamp: Timestamp
}

export type UserVoteWithdrawn = {
  type: 'UserVoteWithdrawn'
  voterId: UserId
  userId: UserId
  timestamp: Timestamp
}

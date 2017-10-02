import { UserEvent } from './types/events'
import { User } from './types/model'

const reduceToUser = (userHistory: UserEvent[], initialState?: User): User =>
  userHistory.reduce(userReducer, initialState)

const userReducer = (user: User, e: UserEvent): User => {
  switch (e.type) {
    case 'UserCreated':
      return {
        userId: e.userId,
        mergedUserIds: [],
        rankEvents: []
      }
    case 'UserUpvotedWithGold':
    case 'UserUpvotedWithSilver':
    case 'UserUpvotedWithBronze':
    case 'UserDownvotedWithGold':
    case 'UserDownvotedWithSilver':
    case 'UserDownvotedWithBronze':
      return {
        ...user,
        rankEvents: [
          ...user.rankEvents,
          {
            category: 'UserVotes',
            eventType: e.type,
            voterId: e.voterId
          }
        ]
      }
    case 'ReviewInvitationDeclined':
    case 'ReviewInvitationExpired':
      return {
        ...user,
        rankEvents: [
          ...user.rankEvents,
          {
            category: 'UserEvents',
            eventType: e.type
          }
        ]
      }
    case 'ReviewUpvotedWithGold':
    case 'ReviewUpvotedWithSilver':
    case 'ReviewUpvotedWithBronze':
    case 'ReviewDownvotedWithGold':
    case 'ReviewDownvotedWithSilver':
    case 'ReviewDownvotedWithBronze':
      return {
        ...user,
        rankEvents: [
          ...user.rankEvents,
          {
            category: 'ReviewVotes',
            eventType: e.type,
            publicationId: e.publicationId,
            projectId: e.projectId
          }
        ]
      }
    case 'ProjectUpvotedWithGold':
    case 'ProjectUpvotedWithSilver':
    case 'ProjectUpvotedWithBronze':
    case 'ProjectDownvotedWithGold':
    case 'ProjectDownvotedWithSilver':
    case 'ProjectDownvotedWithBronze':
      return {
        ...user,
        rankEvents: [
          ...user.rankEvents,
          {
            category: 'ProjectVotes',
            eventType: e.type,
            publicationId: e.publicationId,
            projectId: e.projectId
          }
        ]
      }
    case 'UserVoteWithdrawn':
      return {
        ...user,
        rankEvents: user.rankEvents.filter(
          rankEvent =>
            !(
              rankEvent.category === 'UserVotes' &&
              rankEvent.voterId === e.voterId
            )
        )
      }
    case 'ProjectVoteWithdrawn':
      return {
        ...user,
        rankEvents: user.rankEvents.filter(
          rankEvent =>
            !(
              rankEvent.category === 'ProjectVotes' &&
              rankEvent.voterId === e.voterId &&
              rankEvent.projectId === e.projectId
            )
        )
      }
    case 'ReviewVoteWithdrawn':
      return {
        ...user,
        rankEvents: user.rankEvents.filter(
          rankEvent =>
            !(
              rankEvent.category === 'ReviewVotes' &&
              rankEvent.voterId === e.voterId &&
              rankEvent.projectId === e.projectId
            )
        )
      }
  }

  return user
}

export default reduceToUser

import { UserEvent } from './types/events'
import { User } from './types/model'

const makeUser = (userHistory: UserEvent[], initialState?: User): User =>
  userHistory.reduce(userReducer, initialState)

const userReducer = (user: User, e: UserEvent): User => {
  switch (e.type) {
    case 'UserCreated':
      return {
        userId: e.userId,
        beenionAnalytics: {
          UserUpvotedWithGold: 0,
          UserUpvotedWithSilver: 0,
          UserUpvotedWithBronze: 0,
          UserDownvotedWithGold: 0,
          UserDownvotedWithSilver: 0,
          UserDownvotedWithBronze: 0
        },
        publicationAnalytics: {}
      }
    case 'ReviewInvitationAccepted':
    case 'ReviewInvitationDeclined':
    case 'ReviewInvitationExpired':
    case 'ProjectUpvotedWithGold':
    case 'ProjectUpvotedWithSilver':
    case 'ProjectUpvotedWithBronze':
    case 'ProjectDownvotedWithGold':
    case 'ProjectDownvotedWithSilver':
    case 'ProjectDownvotedWithBronze':
    case 'ReviewUpvotedWithGold':
    case 'ReviewUpvotedWithSilver':
    case 'ReviewUpvotedWithBronze':
    case 'ReviewDownvotedWithGold':
    case 'ReviewDownvotedWithSilver':
    case 'ReviewDownvotedWithBronze':
      const currentVal =
        user.publicationAnalytics[e.publicationId] &&
        user.publicationAnalytics[e.publicationId][e.type]
          ? user.publicationAnalytics[e.publicationId][e.type]
          : 0

      return {
        ...user,
        publicationAnalytics: {
          ...user.publicationAnalytics,
          [e.publicationId]: {
            ...user.publicationAnalytics[e.publicationId],
            [e.type]: currentVal + 1
          }
        }
      }
    case 'UserUpvotedWithGold':
    case 'UserUpvotedWithSilver':
    case 'UserUpvotedWithBronze':
    case 'UserDownvotedWithGold':
    case 'UserDownvotedWithSilver':
    case 'UserDownvotedWithBronze':
      return {
        ...user,
        beenionAnalytics: {
          ...user.beenionAnalytics,
          [e.type]: user.beenionAnalytics[e.type] + 1
        }
      }
  }

  return user
}

export default makeUser

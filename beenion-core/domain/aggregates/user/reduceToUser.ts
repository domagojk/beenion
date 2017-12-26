import { UserEvent, User } from '../../types'

const reduceToUser = (userHistory: UserEvent[], initialState?: User): User =>
  userHistory.reduce(userReducer, initialState)

const userReducer = (user: User, e: UserEvent): User => {
  switch (e.type) {
    case 'UserCreated':
      return {
        userId: e.payload.userId,
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
            voterId: e.payload.voterId
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
            journalId: e.payload.journalId,
            articleId: e.payload.articleId
          }
        ]
      }
    case 'ArticleUpvotedWithGold':
    case 'ArticleUpvotedWithSilver':
    case 'ArticleUpvotedWithBronze':
    case 'ArticleDownvotedWithGold':
    case 'ArticleDownvotedWithSilver':
    case 'ArticleDownvotedWithBronze':
      return {
        ...user,
        rankEvents: [
          ...user.rankEvents,
          {
            category: 'ArticleVotes',
            eventType: e.type,
            journalId: e.payload.journalId,
            articleId: e.payload.articleId
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
              rankEvent.voterId === e.payload.voterId
            )
        )
      }
    case 'ArticleVoteWithdrawn':
      return {
        ...user,
        rankEvents: user.rankEvents.filter(
          rankEvent =>
            !(
              rankEvent.category === 'ArticleVotes' &&
              rankEvent.voterId === e.payload.voterId &&
              rankEvent.articleId === e.payload.articleId
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
              rankEvent.voterId === e.payload.voterId &&
              rankEvent.articleId === e.payload.articleId
            )
        )
      }
  }

  return user
}

export default reduceToUser

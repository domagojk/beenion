import { UserEvent, User } from '../../types'

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
            journalId: e.journalId,
            articleId: e.articleId
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
            journalId: e.journalId,
            articleId: e.articleId
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
    case 'ArticleVoteWithdrawn':
      return {
        ...user,
        rankEvents: user.rankEvents.filter(
          rankEvent =>
            !(
              rankEvent.category === 'ArticleVotes' &&
              rankEvent.voterId === e.voterId &&
              rankEvent.articleId === e.articleId
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
              rankEvent.articleId === e.articleId
            )
        )
      }
  }

  return user
}

export default reduceToUser

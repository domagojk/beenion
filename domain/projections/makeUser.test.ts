import makeUser from './makeUser'
import { UserEvent } from 'domain/types/events'

describe('makeUser projection', () => {
  it('should create an user object', () => {
    const userEvents: UserEvent[] = [
      {
        type: 'UserCreated',
        userId: 'test-user-uuid',
        username: 'testusername',
        timestamp: Date.now()
      }
    ]

    const user = makeUser(userEvents)

    expect(user).toEqual({
      userId: 'test-user-uuid',
      beenionAnalytics: {
        UserUpvotedWithGold: 0,
        UserUpvotedWithSilver: 0,
        UserUpvotedWithBronze: 0,
        UserDownvotedWithGold: 0,
        UserDownvotedWithSilver: 0,
        UserDownvotedWithBronze: 0
      },
      publicationAnalytics: {}
    })
  })

  it('should update beenionAnalytics', () => {
    const userEvents: UserEvent[] = [
      {
        type: 'UserCreated',
        userId: 'test-user-uuid',
        username: 'testusername',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithGold',
        voterId: 'test-user-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithGold',
        voterId: 'test-user-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithSilver',
        voterId: 'test-user-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserUpvotedWithBronze',
        voterId: 'test-user-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithGold',
        voterId: 'test-user-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithSilver',
        voterId: 'test-user-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'UserDownvotedWithBronze',
        voterId: 'test-user-uuid',
        userId: 'test-user-uuid',
        timestamp: Date.now()
      }
    ]

    const user = makeUser(userEvents)

    expect(user).toEqual({
      userId: 'test-user-uuid',
      beenionAnalytics: {
        UserUpvotedWithGold: 2,
        UserUpvotedWithSilver: 1,
        UserUpvotedWithBronze: 1,
        UserDownvotedWithGold: 1,
        UserDownvotedWithSilver: 1,
        UserDownvotedWithBronze: 1
      },
      publicationAnalytics: {}
    })
  })

  it('should update publicationAnalytics', () => {
    const userEvents: UserEvent[] = [
      {
        type: 'UserCreated',
        userId: 'test-user-uuid',
        username: 'testusername',
        timestamp: Date.now()
      },
      {
        type: 'ReviewInvitationAccepted',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewInvitationDeclined',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewInvitationExpired',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewUpvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        reviewId: 'test-reviewer-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewUpvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        reviewId: 'test-reviewer-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewUpvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        reviewId: 'test-reviewer-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewDownvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        reviewId: 'test-reviewer-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewDownvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        reviewId: 'test-reviewer-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ReviewDownvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        reviewId: 'test-reviewer-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectUpvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectUpvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectUpvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectDownvotedWithGold',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectDownvotedWithSilver',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectDownvotedWithBronze',
        voterId: 'test-voter-uuid',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        publicationId: 'test-publication-uuid',
        timestamp: Date.now()
      }
    ]

    const user = makeUser(userEvents)

    expect(user).toEqual({
      userId: 'test-user-uuid',
      beenionAnalytics: {
        UserDownvotedWithBronze: 0,
        UserDownvotedWithGold: 0,
        UserDownvotedWithSilver: 0,
        UserUpvotedWithBronze: 0,
        UserUpvotedWithGold: 0,
        UserUpvotedWithSilver: 0
      },
      publicationAnalytics: {
        'test-publication-uuid': {
          ProjectDownvotedWithBronze: 1,
          ProjectDownvotedWithGold: 1,
          ProjectDownvotedWithSilver: 1,
          ProjectUpvotedWithBronze: 1,
          ProjectUpvotedWithGold: 1,
          ProjectUpvotedWithSilver: 1,
          ReviewDownvotedWithBronze: 1,
          ReviewDownvotedWithGold: 1,
          ReviewDownvotedWithSilver: 1,
          ReviewInvitationAccepted: 1,
          ReviewInvitationDeclined: 1,
          ReviewInvitationExpired: 1,
          ReviewUpvotedWithBronze: 1,
          ReviewUpvotedWithGold: 1,
          ReviewUpvotedWithSilver: 1
        }
      }
    })
  })
})

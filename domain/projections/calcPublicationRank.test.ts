import calcPublicationRank from './calcPublicationRank'
import { User, Publication } from 'domain/types/model'

describe('calcPublicationRank', () => {
  const genericUser: User = {
    userId: 'test-user-uuid',
    publicationAnalytics: {},
    beenionAnalytics: {
      UserUpvotedWithGold: 0,
      UserUpvotedWithSilver: 0,
      UserUpvotedWithBronze: 0,
      UserDownvotedWithGold: 0,
      UserDownvotedWithSilver: 0,
      UserDownvotedWithBronze: 0
    }
  }

  const genericPublication: Publication = {
    publicationId: 'test-publication-uuid',
    privileges: {
      canUpdatePublication: { beenionRank: 100 },
      canDeletePublication: { beenionRank: 100 },
      canCreateProject: { beenionRank: 100 },
      canDeleteProject: { beenionRank: 100 },
      canBanProject: { beenionRank: 100 },
      canUpdateProject: { beenionRank: 100 },
      canResubmitProject: { beenionRank: 100 },
      canVoteWithGold: { beenionRank: 100 },
      canVoteWithSilver: { beenionRank: 100 },
      canVoteWithBronze: { beenionRank: 100 }
    },
    rankConditions: {
      ReviewInvitationAccepted: { factor: 1, max: 100, min: 0 },
      ReviewInvitationDeclined: { factor: -1, max: 0, min: -100 },
      ReviewInvitationExpired: { factor: -1, max: 0, min: -100 },
      ProjectUpvotedWithGold: { factor: 1, max: 100, min: 0 },
      ProjectUpvotedWithSilver: { factor: 1, max: 100, min: 0 },
      ProjectUpvotedWithBronze: { factor: 1, max: 100, min: 0 },
      ProjectDownvotedWithGold: { factor: -1, max: 0, min: -100 },
      ProjectDownvotedWithSilver: { factor: -1, max: 0, min: -100 },
      ProjectDownvotedWithBronze: { factor: -1, max: 0, min: -100 },
      ReviewUpvotedWithGold: { factor: 1, max: 100, min: 0 },
      ReviewUpvotedWithSilver: { factor: 1, max: 100, min: 0 },
      ReviewUpvotedWithBronze: { factor: 1, max: 100, min: 0 },
      ReviewDownvotedWithGold: { factor: -1, max: 0, min: -100 },
      ReviewDownvotedWithSilver: { factor: -1, max: 0, min: -100 },
      ReviewDownvotedWithBronze: { factor: -1, max: 0, min: -100 }
    },
    projectStageRules: [
      {
        canReview: {
          beenionRank: 0,
          publicationRank: 10
        },
        maxReviewers: 3,
        threshold: 2
      },
      {
        canReview: {
          beenionRank: 0,
          publicationRank: 10
        },
        maxReviewers: 3,
        threshold: 3
      }
    ]
  }

  it('should calculate publication rank', () => {
    expect(calcPublicationRank(genericUser, genericPublication)).toBe(0)

    expect(calcPublicationRank({
      ...genericUser,
      publicationAnalytics: {
        'test-publication-uuid': {
          ...genericUser['test-publication-uuid'],
          ProjectUpvotedWithGold: 1
        }
      }
    }, genericPublication)).toBe(1)

    expect(calcPublicationRank({
      ...genericUser,
      publicationAnalytics: {
        'test-publication-uuid': {
          ...genericUser['test-publication-uuid'],
          ProjectUpvotedWithGold: 1,
          ProjectUpvotedWithSilver: 1,
          ProjectUpvotedWithBronze: 1
        }
      }
    }, genericPublication)).toBe(3)

    expect(calcPublicationRank({
      ...genericUser,
      publicationAnalytics: {
        'test-publication-uuid': {
          ...genericUser['test-publication-uuid'],
          ProjectUpvotedWithGold: 1,
          ProjectUpvotedWithSilver: 1,
          ProjectUpvotedWithBronze: 1,
          ProjectDownvotedWithGold: 1,
          ProjectDownvotedWithSilver: 1,
          ProjectDownvotedWithBronze: 1
        }
      }
    }, genericPublication)).toBe(0)

    expect(calcPublicationRank({
      ...genericUser,
      publicationAnalytics: {
        'test-publication-uuid': {
          ...genericUser['test-publication-uuid'],
          ProjectUpvotedWithGold: 200,
          ProjectUpvotedWithSilver: 200,
          ProjectUpvotedWithBronze: 200
        }
      }
    }, genericPublication)).toBe(300)

    expect(calcPublicationRank({
      ...genericUser,
      publicationAnalytics: {
        'test-publication-uuid': {
          ...genericUser['test-publication-uuid'],
          ProjectUpvotedWithGold: 200,
          ProjectUpvotedWithSilver: 200,
          ProjectUpvotedWithBronze: 200,
          ProjectDownvotedWithGold: 1
        }
      }
    }, genericPublication)).toBe(300)
  })
})

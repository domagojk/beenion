import { User, Publication } from './types/model'
import {
  isInAccessList,
  hasBeenionRank,
  hasPublicationRank
} from './privilegeValidation'

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
    canUpdatePublication: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canDeletePublication: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canCreateProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canDeleteProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canBanProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canUpdateProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canResubmitProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithGold: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithSilver: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithBronze: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 10,
      publicationRank: 100
    }
  },
  rankConditions: {
    events: {
      ReviewInvitationAccepted: { factor: 1, group: 'invitation' },
      ReviewInvitationDeclined: { factor: -1, group: 'invitation' },
      ReviewInvitationExpired: { factor: -1, group: 'invitation' },
      ProjectUpvotedWithGold: { factor: 1, group: 'projectGold' },
      ProjectUpvotedWithSilver: { factor: 1, group: 'projectSilver' },
      ProjectUpvotedWithBronze: { factor: 1, group: 'projectBronze' },
      ProjectDownvotedWithGold: { factor: -1, group: 'projectGold' },
      ProjectDownvotedWithSilver: { factor: -1, group: 'projectSilver' },
      ProjectDownvotedWithBronze: { factor: -1, group: 'projectBronze' },
      ReviewUpvotedWithGold: { factor: 1, group: 'reviewGold' },
      ReviewUpvotedWithSilver: { factor: 1, group: 'reviewSilver' },
      ReviewUpvotedWithBronze: { factor: 1, group: 'reviewBronze' },
      ReviewDownvotedWithGold: { factor: -1, group: 'reviewGold' },
      ReviewDownvotedWithSilver: { factor: -1, group: 'reviewSilver' },
      ReviewDownvotedWithBronze: { factor: -1, group: 'reviewBronze' }
    },
    groups: {
      invitation: { min: -100, max: 100 },
      projectGold: { min: -100, max: 100 },
      projectSilver: { min: -100, max: 100 },
      projectBronze: { min: -100, max: 100 },
      reviewGold: { min: -100, max: 100 },
      reviewSilver: { min: -100, max: 100 },
      reviewBronze: { min: -100, max: 100 }
    }
  },
  projectStageRules: [
    {
      canReview: {
        beenionRank: 100,
        publicationRank: 100
      },
      maxReviewers: 3,
      threshold: 2
    },
    {
      canReview: {
        beenionRank: 100,
        publicationRank: 100
      },
      maxReviewers: 3,
      threshold: 3
    }
  ]
}

it('should not be in access list', () => {
  expect(
    isInAccessList(genericPublication.privileges.canBanProject, genericUser)
  ).toBe(false)
})

it('should be in access list', () => {
  const user = {
    ...genericUser,
    userId: 'special-user-uuid'
  }

  expect(
    isInAccessList(genericPublication.privileges.canBanProject, user)
  ).toBe(true)
})

it('should not have sufficient beenionRank', () => {
  expect(
    hasBeenionRank(genericPublication.privileges.canBanProject, genericUser)
  ).toBe(false)
})

it('should have sufficient beenionRank', () => {
  const user = {
    ...genericUser,
    beenionAnalytics: {
      ...genericUser.beenionAnalytics,
      UserUpvotedWithGold: 100
    }
  }

  expect(
    hasBeenionRank(genericPublication.privileges.canBanProject, user)
  ).toBe(true)
})

it('should not have sufficient publicationRank', () => {
  expect(
    hasPublicationRank(
      genericPublication.privileges.canBanProject,
      genericUser,
      genericPublication
    )
  ).toBe(false)
})

it('should have sufficient publicationRank', () => {
  const user = {
    ...genericUser,
    publicationAnalytics: {
      'test-publication-uuid': {
        ReviewUpvotedWithGold: 1000
      }
    }
  }

  expect(
    hasPublicationRank(
      genericPublication.privileges.canBanProject,
      user,
      genericPublication
    )
  ).toBe(true)
})

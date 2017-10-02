import { User, Publication } from './types/model'
import {
  isListedUser,
  hasBeenionRank,
  hasPublicationRank
} from './permissions'

const genericUser = {
  userId: 'test-user-uuid',
  mergedUserIds: [],
  rankEvents: []
} as User

const genericPublication = {
  publicationId: 'test-publication-uuid',
  privilegeConditions: {
    canBanProject: {
      users: ['special-user-uuid'],
      beenionRank: { min: 100 },
      publicationRank: { min: 50 }
    }
  },
  rankCalcParams: {
    events: [
      { eventType: 'UserUpvotedWithGold', factor: 100, group: 'userGold' },
      { eventType: 'UserUpvotedWithSilver', factor: 50, group: 'userSilver' },
      { eventType: 'UserUpvotedWithBronze', factor: 10, group: 'userBronze' },
      { eventType: 'UserDownvotedWithGold', factor: -100, group: 'userGold' },
      { eventType: 'UserDownvotedWithSilver', factor: -50, group: 'userSilver' },
      { eventType: 'UserDownvotedWithBronze', factor: -10, group: 'userBronze' },
      { eventType: 'ReviewInvitationDeclined', factor: -1, group: 'invitation' },
      { eventType: 'ReviewInvitationExpired', factor: -1, group: 'invitation' },
      { eventType: 'ProjectUpvotedWithGold', factor: 100, group: 'projectGold' },
      { eventType: 'ProjectUpvotedWithSilver', factor: 50, group: 'projectSilver' },
      { eventType: 'ProjectUpvotedWithBronze', factor: 1, group: 'projectBronze' },
      { eventType: 'ProjectDownvotedWithGold', factor: -100, group: 'projectGold' },
      { eventType: 'ProjectDownvotedWithSilver', factor: -50, group: 'projectSilver' },
      { eventType: 'ProjectDownvotedWithBronze', factor: -1, group: 'projectBronze' },
      { eventType: 'ReviewUpvotedWithGold', factor: 100, group: 'reviewGold' },
      { eventType: 'ReviewUpvotedWithSilver', factor: 50, group: 'reviewSilver' },
      { eventType: 'ReviewUpvotedWithBronze', factor: 1, group: 'reviewBronze' },
      { eventType: 'ReviewDownvotedWithGold', factor: -100, group: 'reviewGold' },
      { eventType: 'ReviewDownvotedWithSilver', factor: -50, group: 'reviewSilver' },
      { eventType: 'ReviewDownvotedWithBronze', factor: -1, group: 'reviewBronze' }
    ],
    groups: [
      { group: 'invitation', rankRange: { min: -1000, max: 1000 } },
      { group: 'projectGold', rankRange: { min: -1000, max: 1000 } },
      { group: 'projectSilver', rankRange: { min: -1000, max: 1000 } },
      { group: 'projectBronze', rankRange: { min: -1000, max: 1000 } },
      { group: 'reviewGold', rankRange: { min: -1000, max: 1000 } },
      { group: 'reviewSilver', rankRange: { min: -1000, max: 1000 } },
      { group: 'reviewBronze', rankRange: { min: -1000, max: 1000 } }
    ]
  },
  stageRules: [
    { maxReviewers: 3, threshold: 2 },
    { maxReviewers: 3, threshold: 2 }
  ]
} as Publication

it('should not be in access list', () => {
  expect(
    isListedUser(genericPublication.privilegeConditions.canBanProject, genericUser)
  ).toBe(false)
})

it('should be in access list', () => {
  const user = {
    ...genericUser,
    userId: 'special-user-uuid'
  } as User

  expect(
    isListedUser(genericPublication.privilegeConditions.canBanProject, user)
  ).toBe(true)
})

it('should not have sufficient beenionRank', () => {
  expect(
    hasBeenionRank(genericPublication.privilegeConditions.canBanProject, genericUser)
  ).toBe(false)
})

it('should have sufficient beenionRank', () => {
  const user = {
    ...genericUser,
    rankEvents: [
      {
        category: 'UserVotes',
        eventType: 'UserUpvotedWithGold',
        voterId: 'voter1'
      },
      {
        category: 'UserVotes',
        eventType: 'UserUpvotedWithGold',
        voterId: 'voter2'
      },
      {
        category: 'UserVotes',
        eventType: 'UserUpvotedWithGold',
        voterId: 'voter3'
      },
      {
        category: 'UserVotes',
        eventType: 'UserUpvotedWithGold',
        voterId: 'voter4'
      },
      {
        category: 'UserVotes',
        eventType: 'UserUpvotedWithGold',
        voterId: 'voter5'
      }
    ]
  } as User

  expect(
    hasBeenionRank(genericPublication.privilegeConditions.canBanProject, user)
  ).toBe(true)
})

it('should not have sufficient publicationRank', () => {
  expect(
    hasPublicationRank(
      genericPublication.privilegeConditions.canBanProject,
      genericUser,
      genericPublication
    )
  ).toBe(false)
})

it('should have sufficient publicationRank', () => {
  const user = {
    ...genericUser,
    rankEvents: [
      {
        category: 'ReviewVotes',
        eventType: 'ReviewUpvotedWithGold',
        voterId: 'voter1',
        projectId: 'test-projectId',
        publicationId: genericPublication.publicationId
      }
    ]
  } as User

  expect(
    hasPublicationRank(
      genericPublication.privilegeConditions.canBanProject,
      user,
      genericPublication
    )
  ).toBe(true)
})

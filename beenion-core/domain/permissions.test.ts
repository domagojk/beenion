import { User, Journal } from './types/model'
import {
  isListedUser,
  hasBeenionRank,
  hasJournalRank
} from './permissions'

const genericUser = {
  userId: 'test-user-uuid',
  mergedUserIds: [],
  rankEvents: []
} as User

const genericJournal = {
  journalId: 'test-journal-uuid',
  privilegeConditions: {
    canBanArticle: {
      users: ['special-user-uuid'],
      beenionRank: { min: 100 },
      journalRank: { min: 50 }
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
      { eventType: 'ArticleUpvotedWithGold', factor: 100, group: 'articleGold' },
      { eventType: 'ArticleUpvotedWithSilver', factor: 50, group: 'articleSilver' },
      { eventType: 'ArticleUpvotedWithBronze', factor: 1, group: 'articleBronze' },
      { eventType: 'ArticleDownvotedWithGold', factor: -100, group: 'articleGold' },
      { eventType: 'ArticleDownvotedWithSilver', factor: -50, group: 'articleSilver' },
      { eventType: 'ArticleDownvotedWithBronze', factor: -1, group: 'articleBronze' },
      { eventType: 'ReviewUpvotedWithGold', factor: 100, group: 'reviewGold' },
      { eventType: 'ReviewUpvotedWithSilver', factor: 50, group: 'reviewSilver' },
      { eventType: 'ReviewUpvotedWithBronze', factor: 1, group: 'reviewBronze' },
      { eventType: 'ReviewDownvotedWithGold', factor: -100, group: 'reviewGold' },
      { eventType: 'ReviewDownvotedWithSilver', factor: -50, group: 'reviewSilver' },
      { eventType: 'ReviewDownvotedWithBronze', factor: -1, group: 'reviewBronze' }
    ],
    groups: [
      { group: 'invitation', rankRange: { min: -1000, max: 1000 } },
      { group: 'articleGold', rankRange: { min: -1000, max: 1000 } },
      { group: 'articleSilver', rankRange: { min: -1000, max: 1000 } },
      { group: 'articleBronze', rankRange: { min: -1000, max: 1000 } },
      { group: 'reviewGold', rankRange: { min: -1000, max: 1000 } },
      { group: 'reviewSilver', rankRange: { min: -1000, max: 1000 } },
      { group: 'reviewBronze', rankRange: { min: -1000, max: 1000 } }
    ]
  },
  stageRules: [
    { maxReviewers: 3, threshold: 2 },
    { maxReviewers: 3, threshold: 2 }
  ]
} as Journal

it('should not be in access list', () => {
  expect(
    isListedUser(genericJournal.privilegeConditions.canBanArticle, genericUser)
  ).toBe(false)
})

it('should be in access list', () => {
  const user = {
    ...genericUser,
    userId: 'special-user-uuid'
  } as User

  expect(
    isListedUser(genericJournal.privilegeConditions.canBanArticle, user)
  ).toBe(true)
})

it('should not have sufficient beenionRank', () => {
  expect(
    hasBeenionRank(genericJournal.privilegeConditions.canBanArticle, genericUser)
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
    hasBeenionRank(genericJournal.privilegeConditions.canBanArticle, user)
  ).toBe(true)
})

it('should not have sufficient journalRank', () => {
  expect(
    hasJournalRank(
      genericJournal.privilegeConditions.canBanArticle,
      genericUser,
      genericJournal
    )
  ).toBe(false)
})

it('should have sufficient journalRank', () => {
  const user = {
    ...genericUser,
    rankEvents: [
      {
        category: 'ReviewVotes',
        eventType: 'ReviewUpvotedWithGold',
        voterId: 'voter1',
        articleId: 'test-articleId',
        journalId: genericJournal.journalId
      }
    ]
  } as User

  expect(
    hasJournalRank(
      genericJournal.privilegeConditions.canBanArticle,
      user,
      genericJournal
    )
  ).toBe(true)
})

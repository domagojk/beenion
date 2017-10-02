import { RankCalcParams } from './types/model'
import calcRank from './calcRank'

describe('calc Rank', () => {
  const genericRankConditions = {
    events: [
      { eventType: 'ReviewInvitationAccepted', factor: 1, group: 'invitation' },
      { eventType: 'ReviewInvitationDeclined', factor: -1, group: 'invitation' },
      { eventType: 'ReviewInvitationExpired', factor: -1, group: 'invitation' },
      { eventType: 'UserUpvotedWithGold', factor: 3, group: 'userGold' },
      { eventType: 'UserUpvotedWithSilver', factor: 2, group: 'userSilver' },
      { eventType: 'UserUpvotedWithBronze', factor: 1, group: 'userBronze' },
      { eventType: 'UserDownvotedWithGold', factor: -3, group: 'userGold' },
      { eventType: 'UserDownvotedWithSilver', factor: -2, group: 'userSilver' },
      { eventType: 'UserDownvotedWithBronze', factor: -1, group: 'userBronze' },
      { eventType: 'ProjectUpvotedWithGold', factor: 3, group: 'projectGold' },
      { eventType: 'ProjectUpvotedWithSilver', factor: 2, group: 'projectSilver' },
      { eventType: 'ProjectUpvotedWithBronze', factor: 1, group: 'projectBronze' },
      { eventType: 'ProjectDownvotedWithGold', factor: -3, group: 'projectGold' },
      { eventType: 'ProjectDownvotedWithSilver', factor: -2, group: 'projectSilver' },
      { eventType: 'ProjectDownvotedWithBronze', factor: -1, group: 'projectBronze' },
      { eventType: 'ReviewUpvotedWithGold', factor: 3, group: 'reviewGold' },
      { eventType: 'ReviewUpvotedWithSilver', factor: 2, group: 'reviewSilver' },
      { eventType: 'ReviewUpvotedWithBronze', factor: 1, group: 'reviewBronze' },
      { eventType: 'ReviewDownvotedWithGold', factor: -3, group: 'reviewGold' },
      { eventType: 'ReviewDownvotedWithSilver', factor: -2, group: 'reviewSilver' },
      { eventType: 'ReviewDownvotedWithBronze', factor: -1, group: 'reviewBronze' }
    ],
    groups: [
      { group: 'invitation', rankRange: { min: -3, max: 3 } },
      { group: 'userGold', rankRange: { min: -9, max: 9 } },
      { group: 'userSilver', rankRange: { min: -3, max: 3 } },
      { group: 'userBronze', rankRange: { min: -3, max: 3 } },
      { group: 'projectGold', rankRange: { min: -9, max: 9 } },
      { group: 'projectSilver', rankRange: { min: -3, max: 3 } },
      { group: 'projectBronze', rankRange: { min: -3, max: 3 } },
      { group: 'reviewGold', rankRange: { min: -9, max: 9 } },
      { group: 'reviewSilver', rankRange: { min: -3, max: 3 } },
      { group: 'reviewBronze', rankRange: { min: -3, max: 3} }
    ]
  } as RankCalcParams

  it('should calculate publication rank', () => {
    expect(calcRank([], genericRankConditions)).toBe(0)

    expect(
      calcRank(
        [
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          }
        ],
        genericRankConditions
      )
    ).toBe(3)

    expect(
      calcRank(
        [
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithSilver'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithBronze'
          }
        ],
        genericRankConditions
      )
    ).toBe(6)

    expect(
      calcRank(
        [
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithSilver'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithBronze'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithSilver'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithBronze'
          }
        ],
        genericRankConditions
      )
    ).toBe(0)

    expect(
      calcRank(
        [
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithSilver'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithSilver'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithSilver'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithSilver'
          }
        ],
        genericRankConditions
      )
    ).toBe(6)

    expect(
      calcRank(
        [
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserUpvotedWithGold'
          },
          {
            category: 'UserVotes',
            eventType: 'UserDownvotedWithGold'
          }
        ],
        genericRankConditions
      )
    ).toBe(9)
  })
})

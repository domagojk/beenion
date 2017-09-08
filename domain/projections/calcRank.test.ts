import { RankConditions, EventAnalytics } from 'domain/types/model'
import calcRank from './calcRank'

describe('calc Publication Rank', () => {
  const genericRankConditions: RankConditions = {
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
  }

  it('should calculate publication rank', () => {
    expect(calcRank({}, genericRankConditions)).toBe(0)

    expect(
      calcRank(
        {
          ProjectUpvotedWithGold: 1
        },
        genericRankConditions
      )
    ).toBe(1)

    expect(
      calcRank(
        {
          ProjectUpvotedWithGold: 1,
          ProjectUpvotedWithSilver: 1,
          ProjectUpvotedWithBronze: 1
        },
        genericRankConditions
      )
    ).toBe(3)

    expect(
      calcRank(
        {
          ProjectUpvotedWithGold: 1,
          ProjectUpvotedWithSilver: 1,
          ProjectUpvotedWithBronze: 1,
          ProjectDownvotedWithGold: 1,
          ProjectDownvotedWithSilver: 1,
          ProjectDownvotedWithBronze: 1
        },
        genericRankConditions
      )
    ).toBe(0)

    expect(
      calcRank(
        {
          ProjectUpvotedWithGold: 200,
          ProjectUpvotedWithSilver: 200,
          ProjectUpvotedWithBronze: 200
        },
        genericRankConditions
      )
    ).toBe(300)

    expect(
      calcRank(
        {
          ProjectUpvotedWithGold: 200,
          ProjectUpvotedWithSilver: 200,
          ProjectUpvotedWithBronze: 200,
          ProjectDownvotedWithGold: 1
        },
        genericRankConditions
      )
    ).toBe(300)
  })
})

describe('calc Beenion Rank', () => {
  const genericBeenionAnalytics: EventAnalytics = {
    UserDownvotedWithBronze: 0,
    UserDownvotedWithGold: 0,
    UserDownvotedWithSilver: 0,
    UserUpvotedWithBronze: 0,
    UserUpvotedWithGold: 0,
    UserUpvotedWithSilver: 0
  }

  const rankConditions: RankConditions = {
    events: {
      UserUpvotedWithGold: { factor: 100, group: 'gold' },
      UserDownvotedWithGold: { factor: -100, group: 'gold' },
      UserUpvotedWithSilver: { factor: 10, group: 'silver' },
      UserDownvotedWithSilver: { factor: -10, group: 'silver' },
      UserUpvotedWithBronze: { factor: 1, group: 'bronze' },
      UserDownvotedWithBronze: { factor: -1, group: 'bronze' }
    },
    groups: {
      gold: { min: -1000, max: 1000 },
      silver: { min: -100, max: 100 },
      bronze: { min: -100, max: 100 }
    }
  }

  it('should calculate beenion rank', () => {
    expect(calcRank(genericBeenionAnalytics, rankConditions)).toBe(0)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserUpvotedWithGold: 1
        },
        rankConditions
      )
    ).toBe(100)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserUpvotedWithSilver: 1
        },
        rankConditions
      )
    ).toBe(10)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserUpvotedWithBronze: 1
        },
        rankConditions
      )
    ).toBe(1)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserDownvotedWithGold: 10,
          UserUpvotedWithGold: 10
        },
        rankConditions
      )
    ).toBe(0)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserDownvotedWithGold: 10
        },
        rankConditions
      )
    ).toBe(-1000)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserDownvotedWithGold: 15
        },
        rankConditions
      )
    ).toBe(-1000)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserDownvotedWithGold: 15,
          UserDownvotedWithSilver: 100,
          UserDownvotedWithBronze: 100
        },
        rankConditions
      )
    ).toBe(-1200)

    expect(
      calcRank(
        {
          ...genericBeenionAnalytics,
          UserUpvotedWithGold: 15,
          UserUpvotedWithSilver: 100,
          UserUpvotedWithBronze: 100
        },
        rankConditions
      )
    ).toBe(1200)
  })
})

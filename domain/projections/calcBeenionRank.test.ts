import calcBeenionRank from './calcBeenionRank'
import { User, BeenionRankConditions } from 'domain/types/model'

describe('calcBeenionRank', () => {
  const genericUser: User = {
    userId: 'test-user-uuid',
    beenionAnalytics: {
      UserDownvotedWithBronze: 0,
      UserDownvotedWithGold: 0,
      UserDownvotedWithSilver: 0,
      UserUpvotedWithBronze: 0,
      UserUpvotedWithGold: 0,
      UserUpvotedWithSilver: 0
    },
    publicationAnalytics: {}
  }

  const rankConditions: BeenionRankConditions = {
    UserUpvotedWithGold: { factor: 100, min: 0, max: 1000 },
    UserUpvotedWithSilver: { factor: 10, min: 0, max: 100 },
    UserUpvotedWithBronze: { factor: 1, min: 0, max: 100 },
    UserDownvotedWithGold: { factor: -100, min: -1000, max: 0 },
    UserDownvotedWithSilver: { factor: -10, min: -100, max: 0 },
    UserDownvotedWithBronze: { factor: -1, min: -100, max: 0 }
  }

  it('should calculate beenion rank', () => {
    expect(calcBeenionRank(genericUser, rankConditions)).toBe(0)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 1
      }
    }, rankConditions)).toBe(100)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithSilver: 1
      }
    }, rankConditions)).toBe(10)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithBronze: 1
      }
    }, rankConditions)).toBe(1)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserDownvotedWithGold: 10,
        UserUpvotedWithGold: 10
      }
    }, rankConditions)).toBe(0)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserDownvotedWithGold: 10
      }
    }, rankConditions)).toBe(-1000)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserDownvotedWithGold: 15
      }
    }, rankConditions)).toBe(-1000)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserDownvotedWithGold: 15,
        UserDownvotedWithSilver: 100,
        UserDownvotedWithBronze: 100
      }
    }, rankConditions)).toBe(-1200)

    expect(calcBeenionRank({
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 15,
        UserUpvotedWithSilver: 100,
        UserUpvotedWithBronze: 100
      }
    }, rankConditions)).toBe(1200)
  })
})

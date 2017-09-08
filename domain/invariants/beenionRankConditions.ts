import { RankConditions } from 'domain/types/model'

const beenionRankConditions: RankConditions = {
  events: {
    UserUpvotedWithGold: { factor: 100, group: 'gold' },
    UserDownvotedWithGold: { factor: -100, group: 'gold' },
    UserUpvotedWithSilver: { factor: 10, group: 'silver' },
    UserDownvotedWithSilver: { factor: -10, group: 'silver' },
    UserUpvotedWithBronze: { factor: 1, group: 'bronze' },
    UserDownvotedWithBronze: { factor: -1, group: 'bronze' }
  },
  groups: {
    gold: { min: -1000, max: 1000},
    silver: { min: -100, max: 100},
    bronze: { min: -100, max: 100}
  }
}

export default beenionRankConditions

import { RankCalcParams } from '../types'

const beenionRankCalcParams: RankCalcParams = {
  events: [
    {
      eventType: 'UserUpvotedWithGold',
      factor: 100,
      group: 'gold'
    },
    {
      eventType: 'UserDownvotedWithGold',
      factor: -100,
      group: 'gold'
    },
    {
      eventType: 'UserUpvotedWithSilver',
      factor: 10,
      group: 'silver'
    },
    {
      eventType: 'UserDownvotedWithSilver',
      factor: -10,
      group: 'silver'
    },
    {
      eventType: 'UserUpvotedWithBronze',
      factor: 1,
      group: 'bronze'
    },
    {
      eventType: 'UserDownvotedWithBronze',
      factor: -1,
      group: 'bronze'
    }
  ],
  groups: [
    { group: 'gold', rankRange: { min: -1000, max: 1000 } },
    { group: 'silver', rankRange: { min: -100, max: 100 } },
    { group: 'bronze', rankRange: { min: -100, max: 100 } }
  ]
}

export default beenionRankCalcParams

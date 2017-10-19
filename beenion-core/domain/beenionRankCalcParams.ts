import { RankCalcParams } from './types/model'
import { createRankGroup, createRankFactor } from './typeFactories'

const beenionRankCalcParams: RankCalcParams = {
  events: [
    {
      eventType: 'UserUpvotedWithGold',
      factor: createRankFactor(100),
      group: createRankGroup('gold')
    },
    {
      eventType: 'UserDownvotedWithGold',
      factor: createRankFactor(-100),
      group: createRankGroup('gold')
    },
    {
      eventType: 'UserUpvotedWithSilver',
      factor: createRankFactor(10),
      group: createRankGroup('silver')
    },
    {
      eventType: 'UserDownvotedWithSilver',
      factor: createRankFactor(-10),
      group: createRankGroup('silver')
    },
    {
      eventType: 'UserUpvotedWithBronze',
      factor: createRankFactor(1),
      group: createRankGroup('bronze')
    },
    {
      eventType: 'UserDownvotedWithBronze',
      factor: createRankFactor(-1),
      group: createRankGroup('bronze')
    }
  ],
  groups: [
    { group: createRankGroup('gold'), rankRange: { min: -1000, max: 1000 } },
    { group: createRankGroup('silver'), rankRange: { min: -100, max: 100 } },
    { group: createRankGroup('bronze'), rankRange: { min: -100, max: 100 } }
  ]
}

export default beenionRankCalcParams

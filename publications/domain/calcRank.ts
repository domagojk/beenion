import { RankCalcParams, RankEvent } from './types/model'
import * as clamp from 'clamp'

const calcRank = (rankEvents: RankEvent[], rankCalcParams: RankCalcParams): number => {
  if (!rankEvents.length) {
    return 0
  }

  const sumPerGroup = rankCalcParams.events.reduce(
    (sum, { group, factor, eventType }) => {
      const timesOccured = rankEvents.filter(e => e.eventType === eventType).length

      return {
        ...sum,
        [group]: (sum[group] || 0) + timesOccured * factor
      }
    },
    {}
  )

  const rank = Object.keys(sumPerGroup).reduce((sum, group) => {
    const groupCalcParams = rankCalcParams.groups.find(p => p.group === group)
    if (!groupCalcParams) {
      return sum
    }
    const { rankRange } = groupCalcParams

    return sum + clamp(sumPerGroup[group], rankRange.min, rankRange.max)
  }, 0)

  return rank
}

export default calcRank

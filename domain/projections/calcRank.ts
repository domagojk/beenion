import { EventAnalytics, RankConditions } from 'domain/types/model'
import * as clamp from 'clamp'

const calcRank =
  (analytics: EventAnalytics, rankConditions: RankConditions): number => {
    if (!analytics) {
      return 0
    }

    const sumPerGroup =
      Object.keys(analytics).reduce((sumPerGroup, event) => {
        const { group, factor } = rankConditions.events[event]
        const current = sumPerGroup[group] || 0

        return {
          ...sumPerGroup,
          [group]: current + analytics[event] * factor
        }
      }, {})

    const rank =
      Object.keys(sumPerGroup).reduce(
        (sum, group) =>
          sum +
          clamp(
            sumPerGroup[group],
            rankConditions.groups[group].min,
            rankConditions.groups[group].max
          ),
        0
      )

    return rank
  }

export default calcRank

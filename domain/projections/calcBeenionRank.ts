import { User } from 'domain/types/model'
import * as clamp from 'clamp'
import rankConditions from 'domain/invariants/beenionRankConditions'

const calcBeenionRank = (user: User): number => {
  const analytics = user.beenionAnalytics
  const initialRanking = 0

  return Object.keys(analytics).reduce(
    (sum, metric) =>
      sum +
      clamp(
        analytics[metric] * rankConditions[metric].factor,
        rankConditions[metric].min,
        rankConditions[metric].max
      ),
    initialRanking
  )
}

export default calcBeenionRank

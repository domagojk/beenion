import { User, Publication } from 'domain/types/model'
import * as clamp from 'clamp'

const calcPublicationRank = (user: User, publication: Publication): number => {
  const analytics = user.publicationAnalytics[publication.publicationId]
  const rankConditions = publication.rankConditions
  const initialRanking = 0

  if (analytics === undefined) {
    return initialRanking
  }

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

export default calcPublicationRank

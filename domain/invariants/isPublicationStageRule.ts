import { PublicationStageRule } from 'domain/UL/types'

export default (x: PublicationStageRule): x is PublicationStageRule =>
  typeof x === 'object' &&
  typeof x.maxReviewers === 'number' &&
  typeof x.publicationRank === 'number' &&
  typeof x.threshold === 'number'

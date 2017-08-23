import { Publication } from 'domain/UL/types'
import isUUID from './isUUID'
import isDescription from './isDescription'
import isTitle from './isTitle'
import isPublicationStageRule from './isPublicationStageRule'

export default (x: Publication): x is Publication =>
  typeof x === 'object' &&
  isUUID(x.publicationId) &&
  isDescription(x.description) &&
  isTitle(x.title) &&
  Array.isArray(x.stages) &&
  x.stages.length === x.stages.filter(isPublicationStageRule).length &&
  typeof x.userRankingFactors === 'object' &&
  typeof x.privileges === 'object'

import { Project } from 'domain/UL/types'
import isUUID from './isUUID'
import isDescription from './isDescription'
import isTitle from './isTitle'
import isPublicationStageRule from './isPublicationStageRule'

export default (x: Project): x is Project =>
  typeof x === 'object' &&
  typeof x.accepted === 'number' &&
  typeof x.inFinalStage === 'boolean' &&
  Array.isArray(x.assignedReviewers) &&
  Array.isArray(x.completedReviews) &&
  Array.isArray(x.stages) &&
  x.assignedReviewers.length === x.assignedReviewers.filter(isUUID).length &&
  x.completedReviews.length === x.completedReviews.filter(isUUID).length &&
  x.stages.length === x.stages.filter(isPublicationStageRule).length &&
  isPublicationStageRule(x.currentStage) &&
  isUUID(x.ownerId) &&
  isUUID(x.projectId) &&
  isTitle(x.title) &&
  isDescription(x.description)

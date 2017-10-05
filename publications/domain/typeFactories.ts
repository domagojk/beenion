import * as validate from './typeValidation'
import * as errorCodes from './errorCodes'
import { PublicationEvent, UserEvent, ProjectEvent } from './types/events'
import {
  UserId,
  ProjectId,
  PublicationId,
  PublicationPrivilege,
  PublicationPermission,
  Title,
  Description,
  URL,
  Evaluation,
  RankRange,
  RankGroup,
  RankFactor,
  Medal,
  Rating,
  Stage,
  StageRule,
  Timestamp
} from './types/model'

export const createUserHistory = (val: object[]): UserEvent[] => {
  if (!validate.isUserHistory(val)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }
  return val
}

export const createPublicationHistory = (val: object[]): PublicationEvent[] => {
  if (!validate.isPublicationHistory(val)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_HISTORY)
  }
  return val
}

export const createProjectHistory = (val: object[]): ProjectEvent[] => {
  if (!validate.isProjectHistory(val)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_HISTORY)
  }
  return val
}

export const createUserId = (val: string): UserId => {
  if (!validate.isUserId(val)) {
    throw new TypeError(errorCodes.INVALID_USER_ID)
  }
  return val
}

export const createProjectId = (val: string): ProjectId => {
  if (!validate.isProjectId(val)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_ID)
  }
  return val
}

export const createPublicationId = (val: string): PublicationId => {
  if (!validate.isPublicationId(val)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_ID)
  }
  return val
}

export const createTitle = (val: string): Title => {
  if (!validate.isTitle(val)) {
    throw new TypeError(errorCodes.INVALID_TITLE)
  }
  return val
}

export const createDescription = (val: string): Description => {
  if (!validate.isDescription(val)) {
    throw new TypeError(errorCodes.INVALID_DESCRIPTION)
  }
  return val
}

export const createURL = (val: string): URL => {
  if (!validate.isURL(val)) {
    throw new TypeError(errorCodes.INVALID_URL)
  }
  return val
}

export const createEvaluation = (val: string): Evaluation => {
  if (!validate.isEvaluation(val)) {
    throw new TypeError(errorCodes.INVALID_EVALUATION)
  }
  return val
}

export const createMedal = (val: string): Medal => {
  if (!validate.isMedal(val)) {
    throw new TypeError(errorCodes.INVALID_MEDAL)
  }
  return val
}

export const createRating = (val: string): Rating => {
  if (!validate.isRating(val)) {
    throw new TypeError(errorCodes.INVALID_RATING)
  }
  return val
}

export const createRankGroup = (val: string): RankGroup => {
  if (!validate.isRankGroup(val)) {
    throw new TypeError(errorCodes.INVALID_RANKGROUP)
  }
  return val
}

export const createRankFactor = (val: number): RankFactor => {
  if (!validate.isRankFactor(val)) {
    throw new TypeError(errorCodes.INVALID_RANKFACTOR)
  }
  return val
}

export const createRankRange = (val: object): RankRange => {
  if (!validate.isRankRange(val)) {
    throw new TypeError(errorCodes.INVALID_RANKRANGE)
  }
  return val
}

export const createPublicationPrivilege = (val: string): PublicationPrivilege => {
  if (!validate.isPublicationPrivilege(val)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_PRIVILEGE)
  }
  return val
}

export const createPublicationPermission = (val: string): PublicationPermission => {
  if (!validate.isPublicationPermission(val)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_PERMISSION)
  }
  return val
}

export const createUserEventType = (val: string): UserEvent['type'] => {
  if (!validate.isUserEventType(val)) {
    throw new TypeError(errorCodes.INVALID_USER_EVENT_TYPE)
  }
  return val
}

export const createStage = (val: number): Stage => {
  if (!validate.isStage(val)) {
    throw new TypeError(errorCodes.INVALID_STAGE)
  }
  return val
}

export const createStageRule = (val: object): StageRule => {
  if (!validate.isStageRule(val)) {
    throw new TypeError(errorCodes.INVALID_STAGE_RULE)
  }
  return val
}

export const createTimestamp = (val: number): Timestamp => {
  if (!validate.isTimestamp(val)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }
  return val
}

export const createPrivilegeConditions = (val: object): PublicationPermission => {
  if (!validate.isPublicationPermission(val)) {
    throw new TypeError(errorCodes.INVALID_PUBLICATION_PERMISSION)
  }
  return val
}

import * as validate from './typeValidation'
import * as errorCodes from './errorCodes'
import { JournalEvent, UserEvent, ArticleEvent } from './types/events'
import {
  UserId,
  ArticleId,
  JournalId,
  JournalPrivilege,
  JournalPermission,
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

export const createJournalHistory = (val: object[]): JournalEvent[] => {
  if (!validate.isJournalHistory(val)) {
    throw new TypeError(errorCodes.INVALID_JOURNAL_HISTORY)
  }
  return val
}

export const createArticleHistory = (val: object[]): ArticleEvent[] => {
  if (!validate.isArticleHistory(val)) {
    throw new TypeError(errorCodes.INVALID_ARTICLE_HISTORY)
  }
  return val
}

export const createUserId = (val: string): UserId => {
  if (!validate.isUserId(val)) {
    throw new TypeError(errorCodes.INVALID_USER_ID)
  }
  return val
}

export const createArticleId = (val: string): ArticleId => {
  if (!validate.isArticleId(val)) {
    throw new TypeError(errorCodes.INVALID_ARTICLE_ID)
  }
  return val
}

export const createJornalId = (val: string): JournalId => {
  if (!validate.isJournalId(val)) {
    throw new TypeError(errorCodes.INVALID_JOURNAL_ID)
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

export const createJournalPrivilege = (val: string): JournalPrivilege => {
  if (!validate.isJournalPrivilege(val)) {
    throw new TypeError(errorCodes.INVALID_JOURNAL_PRIVILEGE)
  }
  return val
}

export const createJournalPermission = (val: string): JournalPermission => {
  if (!validate.isJournalPermission(val)) {
    throw new TypeError(errorCodes.INVALID_JOURNAL_PERMISSION)
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

export const createPrivilegeConditions = (val: object): JournalPermission => {
  if (!validate.isJournalPermission(val)) {
    throw new TypeError(errorCodes.INVALID_JOURNAL_PERMISSION)
  }
  return val
}

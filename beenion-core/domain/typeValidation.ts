import * as urlRegex from 'url-regex'
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

export const isString = (val) =>
  typeof val === 'string'

export const isNumber = (val) =>
  typeof val === 'number'

export const isObject = (val) =>
  typeof val === 'object'

export const isEvent = (val) =>
  isObject(val) &&
  isString(val.type) &&
  isTimestamp(val.timestamp)

export const isTitle = (val): val is Title =>
  isString(val) &&
  val.length < 100

export const isDescription = (val): val is Description =>
  isString(val)

export const isEvaluation = (val): val is Evaluation =>
  val === 'approve' ||
  val === 'reject'

export const isTimestamp = (val): val is Timestamp =>
  isNumber(val) &&
  // not before 01/01/2017
  val > 1483228800000 &&
  // not after 01/01/2100
  val < 4102444800000

export const isUserId = (val): val is UserId =>
  isString(val)

export const isArticleId = (val): val is ArticleId =>
  isString(val)

export const isJournalId = (val): val is JournalId =>
  isString(val)

export const isMedal = (val): val is Medal =>
  val === 'gold' ||
  val === 'silver' ||
  val === 'bronze'

export const isRating = (val): val is Rating =>
  val === 'upvote' ||
  val === 'downvote'

export const isURL = (val): val is URL =>
  urlRegex({exact: true}).test(val)

export const isRankRange = (val): val is RankRange =>
  isObject(val) &&
  isNumber(val.min) &&
  (val.max === undefined || isNumber(val.max))

export const isRankGroup = (val): val is RankGroup =>
  isString(val)

export const isRankFactor = (val): val is RankFactor =>
  isNumber(val)

export const isStage = (val): val is Stage =>
  val === 0 || val === 1 || val === 2 || val === 3 || val === 4

export const isStageRule = (val): val is StageRule =>
  isObject(val) &&
  isNumber(val.maxReviewers) &&
  isNumber(val.threshold)

export const isJournalPermission = (val): val is JournalPermission =>
  isObject(val) &&
  (val.beenionRank !== undefined || val.journalRank !== undefined) &&
  (!val.users || Array.isArray(val.users)) &&
  (!val.users ||
    val.users.filter(isUserId).length === val.users.length) &&
  (!val.beenionRank || isNumber(val.beenionRank)) &&
  (!val.journalRank || isNumber(val.journalRank))

export const isJournalPrivilege = (val): val is JournalPrivilege => {
  type PossiblePrivileges = {
    [privilege in JournalPrivilege]: boolean
  }
  const possiblePrivileges: PossiblePrivileges = {
    canUpdateJournal: true,
    canUpdatePrivilege: true,
    canUpdateRankCalcParams: true,
    canUpdateStageRules: true,
    canUpdateEditor: true,
    canDeleteJournal: true,
    canReviewInStage0: true,
    canReviewInStage1: true,
    canReviewInStage2: true,
    canReviewInStage3: true,
    canReviewInStage4: true,
    canCreateArticle: true,
    canDeleteArticle: true,
    canRejectApprovedArticle: true,
    canBanArticle: true,
    canUpdateArticle: true,
    canResubmitArticle: true,
    canVoteWithGold: true,
    canVoteWithSilver: true,
    canVoteWithBronze: true
  }

  return (
    isString(val) &&
    possiblePrivileges[val] === true
  )
}
export const isJournalEventType = (val): val is JournalEvent['type'] => {
  type PossibleEvents = {
    [eventType in JournalEvent['type']]: boolean
  }
  const possibleEvents: PossibleEvents = {
    JournalCreated: true,
    JournalDeleted: true,
    JournalTitleDefined: true,
    JournalDescriptionDefined: true,
    JournalRankCalcEventDefined: true,
    JournalRankCalcEventRemoved: true,
    JournalRankCalcGroupDefined: true,
    JournalRankCalcGroupRemoved: true,
    JournalEditorAdded: true,
    JournalEditorConfirmed: true,
    JournalEditorRemoved: true,
    JournalPrivilegeDefined: true,
    JournalPrivilegeRemoved: true,
    JournalStageRuleDefined: true,
    JournalStageRuleRemoved: true
  }

  return (
    isString(val) &&
    possibleEvents[val] === true
  )
}
export const isArticleEventType = (val): val is ArticleEvent['type'] => {
  type PossibleEvents = {
    [eventType in ArticleEvent['type']]: boolean
  }
  const possibleEvents: PossibleEvents = {
    ArticleCreated: true,
    ArticleDeleted: true,
    ArticleStageRulesDefined: true,
    ArticleDescriptionDefined: true,
    ArticleLinkDefined: true,
    ArticleTitleDefined: true,
    ArticlePromoted: true,
    ArticleApproved: true,
    ArticleRejected: true,
    ApprovedArticleRejected: true,
    ArticleResubmitted: true,
    ArticleReviewerInvited: true,
    ArticleReviewerRemoved: true,
    ArticleReviewed: true,
    ArticleBanned: true,
    ArticleUnbanned: true
  }

  return (
    isString(val) &&
    possibleEvents[val] === true
  )
}
export const isUserEventType = (val): val is UserEvent['type'] => {
  type PossibleEvents = {
    [eventType in UserEvent['type']]: boolean
  }

  const possibleEvents: PossibleEvents = {
    UserCreated: true,
    UserAccountMerged: true,
    ReviewInvitationDeclined: true,
    ReviewInvitationExpired: true,
    ArticleUpvotedWithGold: true,
    ArticleUpvotedWithSilver: true,
    ArticleUpvotedWithBronze: true,
    ArticleDownvotedWithGold: true,
    ArticleDownvotedWithSilver: true,
    ArticleDownvotedWithBronze: true,
    ArticleVoteWithdrawn: true,
    ReviewUpvotedWithGold: true,
    ReviewUpvotedWithSilver: true,
    ReviewUpvotedWithBronze: true,
    ReviewDownvotedWithGold: true,
    ReviewDownvotedWithSilver: true,
    ReviewDownvotedWithBronze: true,
    ReviewVoteWithdrawn: true,
    UserUpvotedWithGold: true,
    UserUpvotedWithSilver: true,
    UserUpvotedWithBronze: true,
    UserDownvotedWithGold: true,
    UserDownvotedWithSilver: true,
    UserDownvotedWithBronze: true,
    UserVoteWithdrawn: true
  }

  return (
    isString(val) &&
    possibleEvents[val] === true
  )
}
export const isJournalEvent = (val): val is JournalEvent =>
  isEvent(val) &&
  isJournalId(val.journalId) &&
  isJournalEventType(val.type)

export const isArticleEvent = (val): val is ArticleEvent =>
  isEvent(val) &&
  isArticleId(val.articleId) &&
  isArticleEventType(val.type)

export const isUserEvent = (val): val is UserEvent =>
  isEvent(val) &&
  isUserId(val.userId) &&
  isUserEventType(val.type)

export const isUserHistory = (val): val is UserEvent[] =>
  Array.isArray(val) &&
  val.length > 0 &&
  val.filter(isUserEvent).length === val.length

export const isJournalHistory = (val): val is JournalEvent[] =>
  Array.isArray(val) &&
  val.length > 0 &&
  val.filter(isJournalEvent).length === val.length

export const isArticleHistory = (val): val is ArticleEvent[] =>
  Array.isArray(val) &&
  val.length > 0 &&
  val.filter(isArticleEvent).length === val.length

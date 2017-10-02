import * as urlRegex from 'url-regex'
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

export const isProjectId = (val): val is ProjectId =>
  isString(val)

export const isPublicationId = (val): val is PublicationId =>
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

export const isPublicationPermission = (val): val is PublicationPermission =>
  isObject(val) &&
  (val.beenionRank !== undefined || val.publicationRank !== undefined) &&
  (!val.users || Array.isArray(val.users)) &&
  (!val.users ||
    val.users.filter(isUserId).length === val.users.length) &&
  (!val.beenionRank || isNumber(val.beenionRank)) &&
  (!val.publicationRank || isNumber(val.publicationRank))

export const isPublicationPrivilege = (val): val is PublicationPrivilege => {
  type PossiblePrivileges = {
    [privilege in PublicationPrivilege]: boolean
  }
  const possiblePrivileges: PossiblePrivileges = {
    canUpdatePublication: true,
    canUpdatePrivilege: true,
    canUpdateRankCalcParams: true,
    canUpdateStageRules: true,
    canUpdateEditor: true,
    canDeletePublication: true,
    canReviewInStage0: true,
    canReviewInStage1: true,
    canReviewInStage2: true,
    canReviewInStage3: true,
    canReviewInStage4: true,
    canCreateProject: true,
    canDeleteProject: true,
    canRejectApprovedProject: true,
    canBanProject: true,
    canUpdateProject: true,
    canResubmitProject: true,
    canVoteWithGold: true,
    canVoteWithSilver: true,
    canVoteWithBronze: true
  }

  return (
    isString(val) &&
    possiblePrivileges[val] === true
  )
}
export const isPublicationEventType = (val): val is PublicationEvent['type'] => {
  type PossibleEvents = {
    [eventType in PublicationEvent['type']]: boolean
  }
  const possibleEvents: PossibleEvents = {
    PublicationCreated: true,
    PublicationDeleted: true,
    PublicationTitleDefined: true,
    PublicationDescriptionDefined: true,
    PublicationRankCalcEventDefined: true,
    PublicationRankCalcEventRemoved: true,
    PublicationRankCalcGroupDefined: true,
    PublicationRankCalcGroupRemoved: true,
    PublicationEditorAdded: true,
    PublicationEditorConfirmed: true,
    PublicationEditorRemoved: true,
    PublicationPrivilegeDefined: true,
    PublicationPrivilegeRemoved: true,
    PublicationStageRuleDefined: true,
    PublicationStageRuleRemoved: true
  }

  return (
    isString(val) &&
    possibleEvents[val] === true
  )
}
export const isProjectEventType = (val): val is ProjectEvent['type'] => {
  type PossibleEvents = {
    [eventType in ProjectEvent['type']]: boolean
  }
  const possibleEvents: PossibleEvents = {
    ProjectCreated: true,
    ProjectDeleted: true,
    ProjectStageRulesDefined: true,
    ProjectDescriptionDefined: true,
    ProjectLinkDefined: true,
    ProjectTitleDefined: true,
    ProjectPromoted: true,
    ProjectApproved: true,
    ProjectRejected: true,
    ApprovedProjectRejected: true,
    ProjectResubmitted: true,
    ProjectReviewerInvited: true,
    ProjectReviewerRemoved: true,
    ProjectReviewed: true,
    ProjectBanned: true,
    ProjectUnbanned: true
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
    ProjectUpvotedWithGold: true,
    ProjectUpvotedWithSilver: true,
    ProjectUpvotedWithBronze: true,
    ProjectDownvotedWithGold: true,
    ProjectDownvotedWithSilver: true,
    ProjectDownvotedWithBronze: true,
    ProjectVoteWithdrawn: true,
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
export const isPublicationEvent = (val): val is PublicationEvent =>
  isEvent(val) &&
  isPublicationId(val.publicationId) &&
  isPublicationEventType(val.type)

export const isProjectEvent = (val): val is ProjectEvent =>
  isEvent(val) &&
  isProjectId(val.projectId) &&
  isProjectEventType(val.type)

export const isUserEvent = (val): val is UserEvent =>
  isEvent(val) &&
  isUserId(val.userId) &&
  isUserEventType(val.type)

export const isUserHistory = (val): val is UserEvent[] =>
  Array.isArray(val) &&
  val.length > 0 &&
  val.filter(isUserEvent).length === val.length

export const isPublicationHistory = (val): val is PublicationEvent[] =>
  Array.isArray(val) &&
  val.length > 0 &&
  val.filter(isPublicationEvent).length === val.length

export const isProjectHistory = (val): val is ProjectEvent[] =>
  Array.isArray(val) &&
  val.length > 0 &&
  val.filter(isProjectEvent).length === val.length

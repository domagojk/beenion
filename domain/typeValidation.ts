import * as urlRegex from 'url-regex'
import { PublicationEvent, UserEvent, ProjectEvent } from './types/events'
import {
  Description,
  URL,
  Title,
  Evaluation,
  Timestamp,
  UUID,
  PrivilegeConditions,
  ProjectStageRules,
  PublicationPrivileges,
  RankConditions
} from './types/model'

export const isString =
  (x: string): x is string =>
    typeof x === 'string'

export const isNumber =
  (x: number): x is number =>
    typeof x === 'number'

export const isObject =
  (x: object): x is object =>
    typeof x === 'object'

export const isTitle =
  (x: Title): x is Title =>
    isString(x) &&
    x.length < 100

export const isDescription =
  (x: Description): x is Description =>
    isString(x)

export const isEvaluation =
  (x: Evaluation): x is Evaluation =>
    x === 'approve' ||
    x === 'reject'

export const isTimestamp =
  (x: Timestamp): x is Timestamp =>
    isNumber(x) &&
    // not before 01/01/2017
    x > 1483228800000 &&
    // not after 01/01/2100
    x < 4102444800000

export const isUUID =
  (x: UUID): x is UUID =>
    isString(x)

export const isURL =
  (x: URL): x is URL =>
    urlRegex({exact: true}).test(x)

export const isPrivilegeConditions =
  (x: PrivilegeConditions): x is PrivilegeConditions =>
    isObject(x) &&
    (x.beenionRank !== undefined || x.publicationRank !== undefined) &&
    (!x.userAccessList || Array.isArray(x.userAccessList)) &&
    (!x.userAccessList ||
      x.userAccessList.filter(isUUID).length === x.userAccessList.length) &&
    (!x.beenionRank || isNumber(x.beenionRank)) &&
    (!x.publicationRank || isNumber(x.publicationRank)) &&
    (!x.publicationRank || isNumber(x.publicationRank))

export const isPublicationPrivileges =
  (x: PublicationPrivileges): x is PublicationPrivileges => {
    type PublicationPrivilegesValidation = {
      [eventType in keyof PublicationPrivileges]: (x) => boolean
    }
    const validation: PublicationPrivilegesValidation = {
      canUpdatePublication: isPrivilegeConditions,
      canDeletePublication: isPrivilegeConditions,
      canCreateProject: isPrivilegeConditions,
      canDeleteProject: isPrivilegeConditions,
      canBanProject: isPrivilegeConditions,
      canUpdateProject: isPrivilegeConditions,
      canResubmitProject: isPrivilegeConditions,
      canVoteWithGold: isPrivilegeConditions,
      canVoteWithSilver: isPrivilegeConditions,
      canVoteWithBronze: isPrivilegeConditions
    }

    return (
      isObject(x) &&
      Object.keys(x)
        .filter(privilege => validation[privilege])
        .filter(privilege => validation[privilege](x[privilege]))
        .length === Object.keys(validation).length
    )
  }

export const isRankConditions =
  (x: RankConditions): x is RankConditions =>
    isObject(x) &&
    isObject(x.events) &&
    isObject(x.groups) &&
    Object.values(x.events)
      .filter(e => !isNumber(e.factor))
      .length === 0 &&
    Object.values(x.groups)
      .filter(g => !isNumber(g.min) || !isNumber(g.max))
      .length === 0

export const isProjectStageRules =
  (x: ProjectStageRules[]): x is ProjectStageRules[] =>
    Array.isArray(x) &&
    x.length > 0 &&
    x.filter(
      rule =>
        isObject(rule) &&
        isNumber(rule.maxReviewers) &&
        isNumber(rule.threshold) &&
        isPrivilegeConditions(rule.canReview)
    ).length === x.length

export const isEvent =
  (x: UserEvent | PublicationEvent | ProjectEvent) =>
    isObject(x) &&
    isString(x.type) &&
    isTimestamp(x.timestamp)

export const isPublicationEvent =
  (x: PublicationEvent): x is PublicationEvent => {
    type PublicationEventValidation = {
      [eventType in PublicationEvent['type']]: (x) => boolean
    }
    const validation: PublicationEventValidation = {
      PublicationCreated: isEvent,
      PublicationDeleted: isEvent,
      PublicationTitleUpdated: isEvent,
      PublicationDescriptionUpdated: isEvent,
      PublicationRankConditionsUpdated: isEvent,
      PublicationPrivilegesUpdated: isEvent,
      ProjectStageRulesUpdated: isEvent
    }

    return (
      isObject(x) &&
      isUUID(x.publicationId) &&
      validation[x.type] !== undefined &&
      validation[x.type](x)
    )
  }

export const isProjectEvent =
  (x: ProjectEvent): x is ProjectEvent => {
    type ProjectEventValidation = {
      [eventType in ProjectEvent['type']]: (x) => boolean
    }
    const validation: ProjectEventValidation = {
      ProjectCreated: isEvent,
      ProjectDeleted: isEvent,
      ProjectDescriptionUpdated: isEvent,
      ProjectLinkUpdated: isEvent,
      ProjectTitleUpdated: isEvent,
      ProjectPromoted: isEvent,
      ProjectApproved: isEvent,
      ProjectRejected: isEvent,
      ProjectResubmitted: isEvent,
      ProjectReviewerInvited: isEvent,
      ProjectReviewerInviteFailed: isEvent,
      ProjectReviewerRemoved: isEvent,
      ProjectReviewed: isEvent,
      ProjectBanned: isEvent,
      ProjectUnbanned: isEvent
    }

    return (
      isObject(x) &&
      isUUID(x.projectId) &&
      validation[x.type] !== undefined &&
      validation[x.type](x)
    )
  }

export const isUserEvent =
  (x: UserEvent): x is UserEvent => {
    type UserEventValidation = {
      [eventType in UserEvent['type']]: (x) => boolean
    }

    const validation: UserEventValidation = {
      UserCreated: isEvent,
      ReviewInvitationAccepted: isEvent,
      ReviewInvitationDeclined: isEvent,
      ReviewInvitationExpired: isEvent,
      ReviewUpvotedWithGold: isEvent,
      ReviewUpvotedWithSilver: isEvent,
      ReviewUpvotedWithBronze: isEvent,
      ReviewDownvotedWithGold: isEvent,
      ReviewDownvotedWithSilver: isEvent,
      ReviewDownvotedWithBronze: isEvent,
      ProjectUpvotedWithGold: isEvent,
      ProjectUpvotedWithSilver: isEvent,
      ProjectUpvotedWithBronze: isEvent,
      ProjectDownvotedWithGold: isEvent,
      ProjectDownvotedWithSilver: isEvent,
      ProjectDownvotedWithBronze: isEvent,
      UserUpvotedWithGold: isEvent,
      UserUpvotedWithSilver: isEvent,
      UserUpvotedWithBronze: isEvent,
      UserDownvotedWithGold: isEvent,
      UserDownvotedWithSilver: isEvent,
      UserDownvotedWithBronze: isEvent
    }

    return (
      isEvent(x) &&
      isUUID(x.userId) &&
      validation[x.type] !== undefined &&
      validation[x.type](x)
    )
  }

export const isPublicationHistory =
  (x: PublicationEvent[]): x is PublicationEvent[] =>
    Array.isArray(x) &&
    x.length > 0 &&
    x.filter(isPublicationEvent).length === x.length

export const isProjectHistory =
  (x: ProjectEvent[]): x is ProjectEvent[] =>
    Array.isArray(x) &&
    x.length > 0 &&
    x.filter(isProjectEvent).length === x.length

export const isUserHistory =
  (x: UserEvent[]): x is UserEvent[] =>
    Array.isArray(x) &&
    x.length > 0 &&
    x.filter(isUserEvent).length === x.length

import urlRegex from 'url-regex'
import { PublicationEvent, UserEvent, ProjectEvent } from 'domain/types/events'
import {
  Description,
  URL,
  Title,
  Evaluation,
  Timestamp,
  UUID,
  Permission,
  ProjectStageRules,
  PublicationPrivileges,
  PublicationRankConditions
} from 'domain/types/model'

export const isTitle =
  (x: Title): x is Title =>
    typeof x === 'string' && x.length < 100

export const isDescription =
  (x: Description): x is Description =>
    typeof x === 'string'

export const isEvaluation =
  (x: Evaluation): x is Evaluation =>
    x === 'accept' || x === 'reject'

export const isTimestamp =
  (x: Timestamp): x is Timestamp =>
    typeof x === 'number' &&
    // not before 01/01/2017
    x > 1483228800000 &&
    // not after 01/01/2100
    x < 4102444800000

export const isUUID =
  (x: UUID): x is UUID =>
    typeof x === 'string'

export const isURL =
  (x: URL): x is URL =>
    urlRegex({exact: true}).test(x)

export const isPermission =
  (x: Permission): x is Permission =>
    x.userList !== undefined && Array.isArray(x.userList) ||
    x.beenionRank !== undefined && typeof x.beenionRank === 'number' ||
    x.publicationRank !== undefined && typeof x.publicationRank === 'number' ||
    false

export const isPublicationPrivileges =
  (x: PublicationPrivileges): x is PublicationPrivileges =>
    typeof x === 'object' &&
    isPermission(x.canUpdatePublication) &&
    isPermission(x.canDeletePublication) &&
    isPermission(x.canCreateProject) &&
    isPermission(x.canDeleteProject) &&
    isPermission(x.canBanProject) &&
    isPermission(x.canUpdateProject) &&
    isPermission(x.canResubmitProject) &&
    isPermission(x.canVoteWithGold) &&
    isPermission(x.canVoteWithSilver) &&
    isPermission(x.canVoteWithBronze)

const isRankCondition = (x) =>
  typeof x === 'object' &&
  typeof x.factor === 'number' &&
  (x.max === undefined || typeof x.max === 'number') &&
  (x.min === undefined || typeof x.min === 'number')

export const isPublicationRankConditions =
  (x: PublicationRankConditions): x is PublicationRankConditions =>
    typeof x === 'object' &&
    isRankCondition(x.ReviewInvitationAccepted) &&
    isRankCondition(x.ReviewInvitationDeclined) &&
    isRankCondition(x.ReviewInvitationExpired) &&
    isRankCondition(x.ProjectUpvotedWithGold) &&
    isRankCondition(x.ProjectUpvotedWithSilver) &&
    isRankCondition(x.ProjectUpvotedWithBronze) &&
    isRankCondition(x.ProjectDownvotedWithGold) &&
    isRankCondition(x.ProjectDownvotedWithSilver) &&
    isRankCondition(x.ProjectDownvotedWithBronze) &&
    isRankCondition(x.ReviewUpvotedWithGold) &&
    isRankCondition(x.ReviewUpvotedWithSilver) &&
    isRankCondition(x.ReviewUpvotedWithBronze) &&
    isRankCondition(x.ReviewDownvotedWithGold) &&
    isRankCondition(x.ReviewDownvotedWithSilver) &&
    isRankCondition(x.ReviewDownvotedWithBronze)

export const isProjectStageRules =
  (x: ProjectStageRules[]): x is ProjectStageRules[] =>
    Array.isArray(x) &&
    x.filter(
      rule =>
        typeof rule === 'object' &&
        typeof rule.maxReviewers === 'number' &&
        typeof rule.threshold === 'number' &&
        isPermission(rule.canReview)
    ).length === x.length

export const isPublicationEvent =
  (x: PublicationEvent): x is PublicationEvent =>
    isUUID(x.publicationId) &&
    isTimestamp(x.timestamp) &&
    typeof x.type === 'string'

export const isPublicationHistory =
  (x: PublicationEvent[]): x is PublicationEvent[] =>
    Array.isArray(x) &&
    x.filter(isPublicationEvent).length === x.length

export const isProjectEvent =
  (x: ProjectEvent): x is ProjectEvent =>
    isUUID(x.projectId) &&
    isTimestamp(x.timestamp) &&
    typeof x.type === 'string'

export const isProjectHistory =
  (x: ProjectEvent[]): x is ProjectEvent[] =>
    Array.isArray(x) &&
    x.filter(isProjectEvent).length === x.length

export const isUserEvent =
  (x: UserEvent): x is UserEvent =>
    isUUID(x.userId) &&
    isTimestamp(x.timestamp) &&
    typeof x.type === 'string'

export const isUserHistory =
  (x: UserEvent[]): x is UserEvent[] =>
    Array.isArray(x) &&
    x.filter(isUserEvent).length === x.length

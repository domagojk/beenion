import urlRegex from 'url-regex'
import { PublicationEvent, UserEvent, ProjectEvent } from 'domain/types/events'
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

export const isPrivilegeConditions =
  (x: PrivilegeConditions): x is PrivilegeConditions =>
    x.userAccessList !== undefined && Array.isArray(x.userAccessList) ||
    x.beenionRank !== undefined && typeof x.beenionRank === 'number' ||
    x.publicationRank !== undefined && typeof x.publicationRank === 'number' ||
    false

export const isPublicationPrivileges =
  (x: PublicationPrivileges): x is PublicationPrivileges =>
    typeof x === 'object' &&
    isPrivilegeConditions(x.canUpdatePublication) &&
    isPrivilegeConditions(x.canDeletePublication) &&
    isPrivilegeConditions(x.canCreateProject) &&
    isPrivilegeConditions(x.canDeleteProject) &&
    isPrivilegeConditions(x.canBanProject) &&
    isPrivilegeConditions(x.canUpdateProject) &&
    isPrivilegeConditions(x.canResubmitProject) &&
    isPrivilegeConditions(x.canVoteWithGold) &&
    isPrivilegeConditions(x.canVoteWithSilver) &&
    isPrivilegeConditions(x.canVoteWithBronze)

export const isRankConditions =
  (x: RankConditions): x is RankConditions =>
    typeof x === 'object' &&
    Object.keys(x.events)
      .filter(e =>
        typeof x.events[e].factor === 'number'
      )
      .length === Object.keys(x.events).length &&
    Object.keys(x.groups)
      .filter(g =>
        typeof x.groups[g].min === 'number' &&
        typeof x.groups[g].max === 'number'
      )
      .length === Object.keys(x.groups).length

export const isProjectStageRules =
  (x: ProjectStageRules[]): x is ProjectStageRules[] =>
    Array.isArray(x) &&
    x.filter(
      rule =>
        typeof rule === 'object' &&
        typeof rule.maxReviewers === 'number' &&
        typeof rule.threshold === 'number' &&
        isPrivilegeConditions(rule.canReview)
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

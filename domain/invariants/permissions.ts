import { Project, User, Publication, UUID, Permission } from 'domain/types/model'
import calcPublicationRank from 'domain/projections/calcPublicationRank'
import calcBeenionRank from 'domain/projections/calcBeenionRank'
import beenionPrivileges from './beenionPrivileges'

const hasAccess = (p: Permission, user: User, pub?: Publication) =>
  (p.userList && p.userList.includes(user.userId)) ||
  (p.publicationRank && calcPublicationRank(user, pub) >= p.publicationRank) ||
  (p.beenionRank && calcBeenionRank(user) >= p.beenionRank)

export const canCreatePublication =
  (user: User) =>
    hasAccess(beenionPrivileges.canCreatePublication, user)

export const canUpdatePublication =
  (user: User, pub: Publication) =>
    hasAccess(pub.privileges.canUpdatePublication, user, pub)

export const canDeletePublication =
  (user: User, pub: Publication) =>
    hasAccess(pub.privileges.canDeletePublication, user, pub)

export const canCreateProject =
  (user: User, pub: Publication) =>
    hasAccess(pub.privileges.canCreateProject, user, pub)

export const canDeleteProject =
  (user: User, project: Project, pub: Publication) =>
    project.ownerId === user.userId ||
    hasAccess(pub.privileges.canDeleteProject, user, pub)

export const canBanProject =
  (user: User, project: Project, pub: Publication) =>
    !project.banned &&
    hasAccess(pub.privileges.canBanProject, user, pub)

export const canUpdateProject =
  (user: User, pub: Publication, project: Project) =>
    project.ownerId === user.userId ||
    hasAccess(pub.privileges.canUpdateProject, user, pub)

export const canInviteReviewer =
  (reviewer: User, pub: Publication, project: Project) =>
    project.reviewers.length < project.currentStageRules.maxReviewers &&
    hasAccess(project.currentStageRules.canReview, reviewer, pub)

export const canResubmitProject =
  (user: User, project: Project, pub: Publication) =>
    !project.banned &&
    project.reviewProcessCompleted &&
    project.ownerId === user.userId &&
    hasAccess(pub.privileges.canResubmitProject, user, pub)

export const canRemoveReviewer =
  (reviewerId: UUID, project: Project) =>
    project.reviewers.includes(reviewerId)

export const canReviewProject =
  (project: Project, reviewer: User) =>
    !project.banned &&
    !project.reviewProcessCompleted &&
    project.reviewers.includes(reviewer.userId)

export const canPromoteProject =
  (project: Project) =>
    project.evaluations.length === project.reviewers.length &&
    project.acceptedReviews >= project.currentStageRules.threshold

export const canAcceptProject =
  (project: Project) =>
    !project.banned &&
    !project.reviewProcessCompleted &&
    project.inFinalStage &&
    project.acceptedReviews >= project.currentStageRules.threshold

export const canRejectProject =
  (project: Project) =>
    !project.banned &&
    !project.reviewProcessCompleted &&
    project.acceptedReviews < project.currentStageRules.threshold

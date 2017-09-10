import { Project, User, Publication, UUID } from 'domain/types/model'
import beenionprivileges from './beenionprivileges'
import { isInAccessList, hasBeenionRank, hasPublicationRank } from './accessValidation'

export const canCreatePublication =
  (user: User) =>
    isInAccessList(beenionprivileges.canCreatePublication, user) ||
    hasBeenionRank(beenionprivileges.canCreatePublication, user)

export const canUpdatePublication =
  (user: User, pub: Publication) =>
    isInAccessList(pub.privileges.canUpdatePublication, user) ||
    hasBeenionRank(pub.privileges.canUpdatePublication, user) ||
    hasPublicationRank(pub.privileges.canUpdatePublication, user, pub)

export const canDeletePublication =
  (user: User, pub: Publication) =>
    isInAccessList(pub.privileges.canDeletePublication, user) ||
    hasBeenionRank(pub.privileges.canDeletePublication, user) ||
    hasPublicationRank(pub.privileges.canDeletePublication, user, pub)

export const canCreateProject =
  (user: User, pub: Publication) =>
    isInAccessList(pub.privileges.canCreateProject, user) ||
    hasBeenionRank(pub.privileges.canCreateProject, user) ||
    hasPublicationRank(pub.privileges.canCreateProject, user, pub)

export const canDeleteProject =
  (user: User, project: Project, pub: Publication) =>
    project.ownerId === user.userId ||
    isInAccessList(pub.privileges.canDeleteProject, user) ||
    hasBeenionRank(pub.privileges.canDeleteProject, user) ||
    hasPublicationRank(pub.privileges.canDeleteProject, user, pub)

export const canBanProject =
  (user: User, project: Project, pub: Publication) =>
    !project.banned &&
    (
      isInAccessList(pub.privileges.canBanProject, user) ||
      hasBeenionRank(pub.privileges.canBanProject, user) ||
      hasPublicationRank(pub.privileges.canBanProject, user, pub)
    )

export const canUpdateProject =
  (user: User, project: Project, pub: Publication) =>
    project.ownerId === user.userId ||
    isInAccessList(pub.privileges.canUpdateProject, user) ||
    hasBeenionRank(pub.privileges.canUpdateProject, user) ||
    hasPublicationRank(pub.privileges.canUpdateProject, user, pub)

export const canInviteReviewer =
  (reviewer: User, project: Project, pub: Publication) => {
    const rules = project.stageRules[project.currentStage]

    return (
      project.reviewers.length < rules.maxReviewers &&
      (
        isInAccessList(rules.canReview, reviewer) ||
        hasBeenionRank(rules.canReview, reviewer) ||
        hasPublicationRank(rules.canReview, reviewer, pub)
      )
    )
  }

export const canResubmitProject =
  (user: User, project: Project, pub: Publication) =>
    !project.banned &&
    !project.approved &&
    project.reviewProcessCompleted &&
    project.ownerId === user.userId &&
    (
      isInAccessList(pub.privileges.canResubmitProject, user) ||
      hasBeenionRank(pub.privileges.canResubmitProject, user) ||
      hasPublicationRank(pub.privileges.canResubmitProject, user, pub)
    )

export const canRemoveReviewer =
  (reviewerId: UUID, project: Project) =>
    project.reviewers.includes(reviewerId)

export const canReviewProject =
  (reviewer: User, project: Project) =>
    !project.banned &&
    project.reviewers.includes(reviewer.userId)

export const canPromoteProject =
  (project: Project) => {
    const rules = project.stageRules[project.currentStage]
    const accepted = r => r.evaluation === 'approve'

    return (
      !project.banned &&
      project.evaluations.length === project.reviewers.length &&
      project.evaluations.filter(accepted).length >= rules.threshold
    )
  }

export const canApproveProject =
  (project: Project) =>
    canPromoteProject(project) &&
    project.currentStage === project.stageRules.length - 1

export const canRejectProject =
  (project: Project) => {
    const rules = project.stageRules[project.currentStage]
    const accepted = r => r.evaluation === 'approve'

    return (
      !project.banned &&
      project.evaluations.length === project.reviewers.length &&
      project.evaluations.filter(accepted).length < rules.threshold
    )
  }

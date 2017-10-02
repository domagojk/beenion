import { hasBeenionAccess, hasPublicationAccess as hasPubAccess } from './permissions'
import beenionPrivilegeConditions from './beenionPrivilegeConditions'
import {
  Publication,
  Project,
  User,
  Medal,
  Stage,
  BeenionPermission,
  PublicationPermission,
  UserId,
  ProjectId
} from './types/model'

export const canCreatePublication = (user: User) =>
  hasBeenionAccess(beenionPrivilegeConditions.canCreatePublication, user)

export const canUpdatePublication = (user: User, pub: Publication) =>
  hasPubAccess(pub.privilegeConditions.canUpdatePublication, user, pub)

export const canDeletePublication = (user: User, pub: Publication) =>
  hasPubAccess(pub.privilegeConditions.canDeletePublication, user, pub)

export const canAddPublicationEditor = (editorId: UserId, user: User, pub: Publication) =>
  !pub.editors.invited.includes(editorId) &&
  !pub.editors.confirmed.includes(editorId) &&
  hasPubAccess(pub.privilegeConditions.canUpdateEditor, user, pub)

export const canRemovePublicationEditor = (editorId: UserId, user: User, pub: Publication) =>
  hasPubAccess(pub.privilegeConditions.canUpdateEditor, user, pub) &&
  (
    pub.editors.invited.includes(editorId) ||
    pub.editors.confirmed.includes(editorId)
  )

export const canConfirmPublicationEditor = (editorId: UserId, pub: Publication) =>
  pub.editors.invited.includes(editorId) &&
  !pub.editors.confirmed.includes(editorId)

export const canUpdatePublicationPrivilege = (user: User, pub: Publication) =>
  hasPubAccess(pub.privilegeConditions.canUpdatePrivilege, user, pub)

export const canUpdateRankCalcParams = (user: User, pub: Publication) =>
  hasPubAccess(pub.privilegeConditions.canUpdateRankCalcParams, user, pub)

export const canDefineStageRule = (user: User, pub: Publication, stage: Stage) =>
  stage <= (pub.stageRules.length) &&
  hasPubAccess(pub.privilegeConditions.canUpdateStageRules, user, pub)

export const canRemoveStageRule = (user: User, pub: Publication, stage: Stage) =>
  pub.stageRules[stage] !== undefined &&
  pub.stageRules[stage + 1] === undefined &&
  hasPubAccess(pub.privilegeConditions.canUpdateStageRules, user, pub)

export const canCreateProject = (user: User, pub: Publication) =>
  hasPubAccess(pub.privilegeConditions.canCreateProject, user, pub)

export const canDeleteProject = (user: User, project: Project, pub: Publication) =>
  project.ownerId === user.userId ||
  hasPubAccess(pub.privilegeConditions.canDeleteProject, user, pub)

export const canBanProject = (user: User, project: Project, pub: Publication) =>
  project.banned === false &&
  hasPubAccess(pub.privilegeConditions.canBanProject, user, pub)

export const canUpdateProject = (user: User, project: Project, pub: Publication) =>
  project.ownerId === user.userId ||
  hasPubAccess(pub.privilegeConditions.canUpdateProject, user, pub)

export const canAddReviewer = (reviewer: User, project: Project, pub: Publication) => {
  const rules = project.stageRules[project.currentStage]
  const priviligeName = `canReviewInStage${project.currentStage}`
  const privilege = pub.privilegeConditions[priviligeName]

  return (
    project.reviewers.length < rules.maxReviewers &&
    hasPubAccess(privilege, reviewer, pub)
  )
}
export const canResubmitProject = (user: User, project: Project, pub: Publication) =>
  project.banned === false &&
  project.approved === false &&
  project.reviewProcessCompleted &&
  project.ownerId === user.userId &&
  hasPubAccess(pub.privilegeConditions.canResubmitProject, user, pub)

export const canRemoveReviewer = (reviewerId: UserId, project: Project) =>
  project.reviewers.includes(reviewerId)

export const canReviewProject = (reviewer: User, project: Project) =>
  project.banned === false && project.reviewers.includes(reviewer.userId)

export const canPromoteProject = (project: Project) => {
  const currentStageRules = project.stageRules[project.currentStage]
  const approvedEvaluations =
    project.evaluations.filter(r => r.evaluation === 'approve')

  return (
    project.banned === false &&
    project.evaluations.length === project.reviewers.length &&
    approvedEvaluations.length >= currentStageRules.threshold
  )
}
export const canApproveProject = (project: Project) =>
  canPromoteProject(project) && project.currentStage === project.lastStage

export const canRejectProject = (project: Project) => {
  const currentStageRules = project.stageRules[project.currentStage]
  const approvedEvaluations =
    project.evaluations.filter(r => r.evaluation === 'approve')

  return (
    !project.banned &&
    project.evaluations.length === project.reviewers.length &&
    approvedEvaluations.length < currentStageRules.threshold
  )
}
export const canRejectApprovedProject = (user: User, project: Project, pub: Publication) =>
  project.approved &&
  hasPubAccess(pub.privilegeConditions.canRejectApprovedProject, user, pub)

export const canVoteInBeenion = (user: User, medal: Medal) => {
  type VotePrivilege = {
    [medal in Medal]: BeenionPermission
  }
  const privileges: VotePrivilege = {
    gold: beenionPrivilegeConditions.canVoteWithGold,
    silver: beenionPrivilegeConditions.canVoteWithSilver,
    bronze: beenionPrivilegeConditions.canVoteWithBronze
  }
  return hasBeenionAccess(privileges[medal], user)
}
export const canVoteInPublication = (user: User, pub: Publication, medal: Medal) => {
  type VotePrivilege = {
    [medal in Medal]: PublicationPermission
  }
  const privileges: VotePrivilege = {
    gold: pub.privilegeConditions.canVoteWithGold,
    silver: pub.privilegeConditions.canVoteWithSilver,
    bronze: pub.privilegeConditions.canVoteWithBronze
  }
  return hasPubAccess(privileges[medal], user, pub)
}
export const canRateProject = (
  voter: User,
  projectOwner: User,
  projectId: ProjectId,
  pub: Publication,
  medal: Medal
) =>
  canVoteInPublication(voter, pub, medal) &&
  (
    projectOwner.rankEvents.filter(rankEvent =>
      rankEvent.category === 'ProjectVotes' &&
      rankEvent.projectId === projectId &&
      rankEvent.voterId === voter.userId
    ).length === 0
  )

export const canRateReview = (
  voter: User,
  reviewer: User,
  projectId: ProjectId,
  pub: Publication,
  medal: Medal
) =>
  canVoteInPublication(voter, pub, medal) &&
  (
    reviewer.rankEvents.filter(rankEvent =>
      rankEvent.category === 'ReviewVotes' &&
      rankEvent.projectId === projectId &&
      rankEvent.voterId === voter.userId
    ).length === 0
  )

export const canRateUser = (voter: User, user: User, medal: Medal) =>
  canVoteInBeenion(voter, medal) &&
  (
    user.rankEvents.filter(rankEvent =>
      rankEvent.category === 'UserEvents' &&
      rankEvent.voterId === voter.userId
    ).length === 0
  )

export const canWithdrawUserVote = (voter: User, user: User) =>
  user.rankEvents.filter(rankEvent =>
    rankEvent.category === 'UserEvents' &&
    rankEvent.voterId === voter.userId
  ).length !== 0

export const canWithdrawReviewVote = (
  voter: User,
  reviewer: User,
  projectId: ProjectId
) =>
  reviewer.rankEvents.filter(rankEvent =>
    rankEvent.category === 'ReviewVotes' &&
    rankEvent.projectId === projectId &&
    rankEvent.voterId === voter.userId
  ).length !== 0

export const canWithdrawProjectVote = (
  voter: User,
  projectOwner: User,
  projectId: ProjectId
) =>
  projectOwner.rankEvents.filter(rankEvent =>
    rankEvent.category === 'ProjectVotes' &&
    rankEvent.projectId === projectId &&
    rankEvent.voterId === voter.userId
  ).length !== 0

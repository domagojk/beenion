import canReviewProject from 'domain/invariants/canReviewProject'
import canPromoteProject from 'domain/invariants/canPromoteProject'
import canAcceptProject from 'domain/invariants/canAcceptProject'
import canRejectProject from 'domain/invariants/canRejectProject'
import isMember from 'domain/invariants/isMember'
import isProject from 'domain/invariants/isProject'
import isEvaluation from 'domain/invariants/isEvaluation'
import isTimestamp from 'domain/invariants/isTimestamp'
import makeProject from 'domain/projections/makeProject'
import errors from 'domain/errors/constants'
import { Timestamp, Evaluation, Member, Project, ProjectEvent } from 'domain/UL/types'

function reviewProject (
  reviewer: Member,
  project: Project,
  evaluation: Evaluation,
  timestamp: Timestamp
): ProjectEvent[] {
  if (!isMember(reviewer)) {
    throw new Error(errors.INVALID_MEMBER_TYPE)
  }

  if (!isProject(project)) {
    throw new Error(errors.INVALID_PROJECT_TYPE)
  }

  if (!isEvaluation(evaluation)) {
    throw new Error(errors.INVALID_EVALUATION_TYPE)
  }

  if (!isTimestamp(timestamp)) {
    throw new Error(errors.INVALID_TIMESTAMP_TYPE)
  }

  if (!canReviewProject(project, reviewer)) {
    throw new Error(errors.PROJECT_REVIEW_NOT_PERMITED)
  }

  const projectReviewed: ProjectEvent = {
    type: 'ProjectReviewed',
    projectId: project.projectId,
    reviewerId: reviewer.userId,
    evaluation,
    timestamp
  }
  const projectPromoted: ProjectEvent = {
    type: 'ProjectPromoted',
    projectId: project.projectId,
    timestamp
  }
  const projectAccepted: ProjectEvent = {
    type: 'ProjectAccepted',
    projectId: project.projectId,
    timestamp
  }
  const projectRejected: ProjectEvent = {
    type: 'ProjectRejected',
    projectId: project.projectId,
    timestamp
  }

  const newProject = makeProject([projectReviewed], project)

  if (canAcceptProject(newProject)) {
    return [projectReviewed, projectPromoted, projectAccepted]
  }

  if (canRejectProject(newProject)) {
    return [projectReviewed, projectPromoted, projectRejected]
  }

  if (canPromoteProject(newProject)) {
    return [projectReviewed, projectPromoted]
  }

  return [projectReviewed]
}

export default reviewProject

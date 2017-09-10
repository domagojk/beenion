import { Evaluation, Timestamp } from 'domain/types/model'
import { UserEvent, ProjectEvent } from 'domain/types/events'
import makeProject from 'domain/projections/makeProject'
import makeUser from 'domain/projections/makeUser'
import * as permissions from 'domain/invariants/permissions'
import * as validate from 'domain/invariants/typeValidation'
import * as errorCodes from 'domain/invariants/errorCodes'

function reviewProject (command: {
  reviewerHistory: UserEvent[]
  projectHistory: ProjectEvent[]
  evaluation: Evaluation
  timestamp: Timestamp
}): ProjectEvent[] {

  if (!validate.isUserHistory(command.reviewerHistory)) {
    throw new TypeError(errorCodes.INVALID_USER_HISTORY)
  }

  if (!validate.isProjectHistory(command.projectHistory)) {
    throw new TypeError(errorCodes.INVALID_PROJECT_HISTORY)
  }

  if (!validate.isEvaluation(command.evaluation)) {
    throw new TypeError(errorCodes.INVALID_EVALUATION)
  }

  if (!validate.isTimestamp(command.timestamp)) {
    throw new TypeError(errorCodes.INVALID_TIMESTAMP)
  }

  const reviewer = makeUser(command.reviewerHistory)
  const project = makeProject(command.projectHistory)

  if (!permissions.canReviewProject(reviewer, project)) {
    throw new Error(errorCodes.REVIEW_PROJECT_NOT_ALLOWED)
  }

  const projectReviewed: ProjectEvent = {
    type: 'ProjectReviewed',
    projectId: project.projectId,
    reviewerId: reviewer.userId,
    evaluation: command.evaluation,
    timestamp: command.timestamp
  }
  const projectPromoted: ProjectEvent = {
    type: 'ProjectPromoted',
    projectId: project.projectId,
    timestamp: command.timestamp
  }
  const projectApproved: ProjectEvent = {
    type: 'ProjectApproved',
    projectId: project.projectId,
    timestamp: command.timestamp
  }
  const projectRejected: ProjectEvent = {
    type: 'ProjectRejected',
    projectId: project.projectId,
    timestamp: command.timestamp
  }

  const reviewedProject = makeProject([projectReviewed], project)

  if (permissions.canApproveProject(reviewedProject)) {
    return [projectReviewed, projectApproved]
  }
  if (permissions.canRejectProject(reviewedProject)) {
    return [projectReviewed, projectRejected]
  }
  if (permissions.canPromoteProject(reviewedProject)) {
    return [projectReviewed, projectPromoted]
  }

  return [projectReviewed]
}

export default reviewProject

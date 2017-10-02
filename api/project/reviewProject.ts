import { ProjectEvent } from 'domain/types/events'
import * as rules from 'domain/businessRules'
import { PROJECT_REVIEW_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToProject from 'domain/reduceToProject'
import reduceToUser from 'domain/reduceToUser'
import {
  createUserHistory,
  createEvaluation,
  createProjectHistory,
  createTimestamp
} from 'domain/typeFactories'

function reviewProject (command: {
  reviewerHistory: object[]
  projectHistory: object[]
  evaluation: string
  timestamp: number
}): ProjectEvent[] {

  const reviewerHistory = createUserHistory(command.reviewerHistory)
  const projectHistory = createProjectHistory(command.projectHistory)
  const evaluation = createEvaluation(command.evaluation)
  const timestamp = createTimestamp(command.timestamp)

  const reviewer = reduceToUser(reviewerHistory)
  const project = reduceToProject(projectHistory)

  if (!rules.canReviewProject(reviewer, project)) {
    throw new Error(PROJECT_REVIEW_NOT_ALLOWED)
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
    userId: reviewer.userId,
    projectId: project.projectId,
    timestamp
  }
  const projectApproved: ProjectEvent = {
    type: 'ProjectApproved',
    userId: reviewer.userId,
    projectId: project.projectId,
    timestamp
  }
  const projectRejected: ProjectEvent = {
    type: 'ProjectRejected',
    userId: reviewer.userId,
    projectId: project.projectId,
    timestamp
  }

  const reviewedProject = reduceToProject([projectReviewed], project)

  if (rules.canApproveProject(reviewedProject)) {
    return [projectReviewed, projectApproved]
  }
  if (rules.canRejectProject(reviewedProject)) {
    return [projectReviewed, projectRejected]
  }
  if (rules.canPromoteProject(reviewedProject)) {
    return [projectReviewed, projectPromoted]
  }

  return [projectReviewed]
}

export default reviewProject

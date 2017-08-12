import { ReviewProject, ProjectReviewed } from 'domain/UL'
import calcProjectState from './state/calcProjectState'

function reviewProject (command: ReviewProject): [ProjectReviewed] {
  const project = calcProjectState(command.projectHistory)

  if (!project.assignedReviewers.includes(command.reviewer.id)) {
    throw new Error(
      `Reviewer ${command.reviewer} is not allowed to review project ${project.id}.`
    )
  }

  return [
    {
      type: 'ProjectReviewed',
      projectId: command.projectId,
      review: command.review,
      reviewer: command.reviewer,
      timestamp: command.timestamp
    }
  ]
}

export default reviewProject

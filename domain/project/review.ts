import { ProjectEvents } from './types/ProjectEvents'
import ProjectReviewed from './events/ProjectReviewed'
import getProjectState from './state/project'

function review (
  history: ProjectEvents,
  reviewerId: number,
  review: 'accept' | 'reject'
) {
  const project = getProjectState(history)

  if (!project.id) {
    throw new Error(`Project not found.`)
  }

  if (project.assignedReviewers.indexOf(reviewerId) === -1) {
    throw new Error(
      `Reviewer ${reviewerId} is not allowed to review project ${project.id}.`
    )
  }

  return [
    new ProjectReviewed(project.id, reviewerId, review)
  ]
}

export default review

import { ProjectEvents } from './types/ProjectEvents'
import ProjectReviewerInvited from './events/ProjectReviewerInvited'
import getProjectState from './state/project'

function inviteReviewer (
  history: ProjectEvents,
  reviewerId: number,
  reviewerPublicationRating: number,
  reviewerBeenionRating: number
) {
  const project = getProjectState(history)
  const currentStageConditions = project.publicationStages[project.currentStage]

  // todo: check rating or id

  return [
    new ProjectReviewerInvited(project.id, reviewerId)
  ]
}

export default inviteReviewer

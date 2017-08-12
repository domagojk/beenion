import { InviteProjectReviewer, ProjectReviewerInvited } from 'domain/UL'
import calcProjectState from './state/calcProjectState'
import canReviewProject from './rules/canReviewProject'

function inviteProjectReviewer (c: InviteProjectReviewer): [ProjectReviewerInvited] {
  const project = calcProjectState(c.projectHistory)
  const condition = project.publicationConditions[project.currentStage]

  if (!canReviewProject(c.reviewer, condition)) {
    throw new Error(
      `User ${c.reviewer.username} is not allowed to review project: ${c.projectId}.`
    )
  }

  if (project.assignedReviewers.length === condition.threshold) {
    throw new Error(
      `User ${c.reviewer.username} could not be invited. Maximum assigned reviewers.`
    )
  }

  return [
    {
      type: 'ProjectReviewerInvited',
      projectId: c.projectId,
      reviewer: c.reviewer,
      timestamp: c.timestamp
    }
  ]
}

export default inviteProjectReviewer

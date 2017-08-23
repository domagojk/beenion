import canInviteReviewer from 'domain/invariants/canInviteReviewer'
import isMember from 'domain/invariants/isMember'
import isProject from 'domain/invariants/isProject'
import isTimestamp from 'domain/invariants/isTimestamp'
import errors from 'domain/errors/constants'
import { Timestamp, Member, Project, ProjectEvent } from 'domain/UL/types'

function inviteProjectReviewer (
  reviewer: Member,
  project: Project,
  timestamp: Timestamp
): ProjectEvent[] {
  if (!isMember(reviewer)) {
    throw new Error(errors.INVALID_MEMBER_TYPE)
  }

  if (!isProject(project)) {
    throw new Error(errors.INVALID_PROJECT_TYPE)
  }

  if (!isTimestamp(timestamp)) {
    throw new Error(errors.INVALID_TIMESTAMP_TYPE)
  }

  if (!canInviteReviewer(project, reviewer)) {
    throw new Error(errors.REVIEWER_INVITE_NOT_PERMITED)
  }

  return [
    {
      type: 'ProjectReviewerInvited',
      projectId: project.projectId,
      reviewerId: reviewer.userId,
      timestamp
    }
  ]
}

export default inviteProjectReviewer

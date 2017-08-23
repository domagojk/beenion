import canDeleteProject from 'domain/invariants/canDeleteProject'
import isMember from 'domain/invariants/isMember'
import isProject from 'domain/invariants/isProject'
import isPublication from 'domain/invariants/isPublication'
import isTimestamp from 'domain/invariants/isTimestamp'
import errors from 'domain/errors/constants'
import { Timestamp, Publication, Member, Project, ProjectEvent } from 'domain/UL/types'

function deleteProject (
  member: Member,
  project: Project,
  publication: Publication,
  timestamp: Timestamp
): ProjectEvent[] {
  if (!isMember(member)) {
    throw new Error(errors.INVALID_MEMBER_TYPE)
  }

  if (!isProject(project)) {
    throw new Error(errors.INVALID_PROJECT_TYPE)
  }

  if (!isPublication(publication)) {
    throw new Error(errors.INVALID_PUBLICATION_TYPE)
  }

  if (!isTimestamp(timestamp)) {
    throw new Error(errors.INVALID_TIMESTAMP_TYPE)
  }

  if (!canDeleteProject(member, project, publication)) {
    throw new Error(errors.PROJECT_DELETE_NOT_PERMITED)
  }

  return [
    {
      type: 'ProjectDeleted',
      projectId: project.projectId,
      userId: member.userId,
      timestamp
    }
  ]
}

export default deleteProject

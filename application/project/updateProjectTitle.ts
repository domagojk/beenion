import canUpdateProjectInfo from 'domain/invariants/canUpdateProjectInfo'
import isMember from 'domain/invariants/isMember'
import isProject from 'domain/invariants/isProject'
import isPublication from 'domain/invariants/isPublication'
import isTimestamp from 'domain/invariants/isTimestamp'
import isTitle from 'domain/invariants/isTitle'
import errors from 'domain/errors/constants'
import { Timestamp, Publication, Member, Project, Title, ProjectEvent } from 'domain/UL/types'

function updateProjectTitle (
  member: Member,
  project: Project,
  publication: Publication,
  title: Title,
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

  if (!isTitle(title)) {
    throw new Error(errors.INVALID_TITLE_TYPE)
  }

  if (!isTimestamp(timestamp)) {
    throw new Error(errors.INVALID_TIMESTAMP_TYPE)
  }

  if (!canUpdateProjectInfo(member, project, publication)) {
    throw new Error(errors.PROJECT_UPDATE_NOT_PERMITED)
  }

  return [
    {
      type: 'ProjectTitleUpdated',
      projectId: project.projectId,
      title,
      timestamp
    }
  ]
}

export default updateProjectTitle

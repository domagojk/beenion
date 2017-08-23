import canUpdateProjectInfo from 'domain/invariants/canUpdateProjectInfo'
import isMember from 'domain/invariants/isMember'
import isProject from 'domain/invariants/isProject'
import isPublication from 'domain/invariants/isPublication'
import isTimestamp from 'domain/invariants/isTimestamp'
import isURL from 'domain/invariants/isURL'
import errors from 'domain/errors/constants'
import { Timestamp, Publication, Member, Project, URL, ProjectEvent } from 'domain/UL/types'

function updateProjectLink (
  member: Member,
  project: Project,
  publication: Publication,
  link: URL,
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

  if (!isURL(link)) {
    throw new Error(errors.INVALID_URL_TYPE)
  }

  if (!isTimestamp(timestamp)) {
    throw new Error(errors.INVALID_TIMESTAMP_TYPE)
  }

  if (!canUpdateProjectInfo(member, project, publication)) {
    throw new Error(errors.PROJECT_UPDATE_NOT_PERMITED)
  }

  return [
    {
      type: 'ProjectLinkUpdated',
      projectId: project.projectId,
      link,
      timestamp
    }
  ]
}

export default updateProjectLink

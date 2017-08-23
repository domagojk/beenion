import canUpdateProjectInfo from 'domain/invariants/canUpdateProjectInfo'
import isMember from 'domain/invariants/isMember'
import isProject from 'domain/invariants/isProject'
import isPublication from 'domain/invariants/isPublication'
import isTimestamp from 'domain/invariants/isTimestamp'
import isDescription from 'domain/invariants/isDescription'
import errors from 'domain/errors/constants'
import { Timestamp, Publication, Member, Project, Description, ProjectEvent } from 'domain/UL/types'

function updateProjectDescription (
  member: Member,
  project: Project,
  publication: Publication,
  description: Description,
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

  if (!isDescription(description)) {
    throw new Error(errors.INVALID_DESCRIPTION_TYPE)
  }

  if (!isTimestamp(timestamp)) {
    throw new Error(errors.INVALID_TIMESTAMP_TYPE)
  }

  if (!canUpdateProjectInfo(member, project, publication)) {
    throw new Error(errors.PROJECT_UPDATE_NOT_PERMITED)
  }

  return [
    {
      type: 'ProjectDescriptionUpdated',
      projectId: project.projectId,
      description,
      timestamp
    }
  ]
}

export default updateProjectDescription

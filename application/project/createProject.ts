import canCreateProject from 'domain/invariants/canCreateProject'
import isMember from 'domain/invariants/isMember'
import isPublication from 'domain/invariants/isPublication'
import isUUID from 'domain/invariants/isUUID'
import isURL from 'domain/invariants/isURL'
import isTitle from 'domain/invariants/isTitle'
import isDescription from 'domain/invariants/isDescription'
import isTimestamp from 'domain/invariants/isTimestamp'
import errors from 'domain/errors/constants'
import {
  UUID,
  Description,
  Timestamp,
  Publication,
  Member,
  ProjectEvent,
  Title,
  URL
} from 'domain/UL/types'

function createProject (
  member: Member,
  publication: Publication,
  projectId: UUID,
  title: Title,
  description: Description,
  link: URL,
  timestamp: Timestamp
): ProjectEvent[] {
  if (!isMember(member)) {
    throw new Error(errors.INVALID_MEMBER_TYPE)
  }

  if (!isPublication(publication)) {
    throw new Error(errors.INVALID_PUBLICATION_TYPE)
  }

  if (!isUUID(projectId)) {
    throw new Error(errors.INVALID_UUID_TYPE)
  }

  if (!isTitle(title)) {
    throw new Error(errors.INVALID_TITLE_TYPE)
  }

  if (!isDescription(description)) {
    throw new Error(errors.INVALID_DESCRIPTION_TYPE)
  }

  if (!isURL(link)) {
    throw new Error(errors.INVALID_URL_TYPE)
  }

  if (!isTimestamp(timestamp)) {
    throw new Error(errors.INVALID_TIMESTAMP_TYPE)
  }

  if (!canCreateProject(member, publication)) {
    throw new Error(errors.PROJECT_CREATE_NOT_PERMITED)
  }

  return [
    {
      type: 'ProjectCreated',
      ownerId: member.userId,
      publicationId: publication.publicationId,
      projectId,
      title,
      description,
      link,
      stages: publication.stages,
      timestamp
    }
  ]
}

export default createProject

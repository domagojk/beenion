import { UpdateProjectLink, ProjectLinkUpdated } from 'domain/UL'

function updateProjectLink (c: UpdateProjectLink): [ProjectLinkUpdated] {
  return [
    {
      type: 'ProjectLinkUpdated',
      projectId: c.projectId,
      link: c.link,
      timestamp: c.timestamp
    }
  ]
}

export default updateProjectLink

import { UpdateProjectTitle, ProjectTitleUpdated } from 'domain/UL'

function updateProjectTitle (c: UpdateProjectTitle): [ProjectTitleUpdated] {
  return [
    {
      type: 'ProjectTitleUpdated',
      projectId: c.projectId,
      title: c.title,
      timestamp: c.timestamp
    }
  ]
}

export default updateProjectTitle

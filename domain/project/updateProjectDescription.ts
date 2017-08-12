import { UpdateProjectDescription, ProjectDescriptionUpdated } from 'domain/UL'

function updateProjectDescription (c: UpdateProjectDescription): [ProjectDescriptionUpdated] {
  return [
    {
      type: 'ProjectDescriptionUpdated',
      projectId: c.projectId,
      description: c.description,
      timestamp: c.timestamp
    }
  ]
}

export default updateProjectDescription

import { DeleteProject, ProjectDeleted } from 'domain/UL'

function deleteProject (c: DeleteProject): [ProjectDeleted] {
  return [
    {
      type: 'ProjectDeleted',
      projectId: c.projectId,
      timestamp: c.timestamp
    }
  ]
}

export default deleteProject

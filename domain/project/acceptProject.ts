import { AcceptProject, ProjectAccepted } from 'domain/UL'

function acceptProject (c: AcceptProject): [ProjectAccepted] {
  return [
    {
      type: 'ProjectAccepted',
      projectId: c.projectId,
      timestamp: c.timestamp
    }
  ]
}

export default acceptProject

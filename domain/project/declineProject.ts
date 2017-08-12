import { DeclineProject, ProjectDeclined } from 'domain/UL'

function declineProject (c: DeclineProject): [ProjectDeclined] {
  return [
    {
      type: 'ProjectDeclined',
      projectId: c.projectId,
      timestamp: c.timestamp
    }
  ]
}

export default declineProject

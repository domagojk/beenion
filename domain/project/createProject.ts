import { CreateProject, ProjectCreated } from 'domain/UL'
import calcPublicationState from './state/calcPublicationState'

function createProject (c: CreateProject): [ProjectCreated] {
  const publication = calcPublicationState(c.publicationHistory)

  if (!publication.conditions || publication.conditions.length === 0) {
    throw new Error('Missing publication conditions')
  }

  return [
    {
      type: 'ProjectCreated',
      projectId: c.projectId,
      publicationId: c.publicationId,
      publicationConditions: publication.conditions,
      owner: c.owner,
      title: c.title,
      description: c.description,
      link: c.link,
      timestamp: c.timestamp
    }
  ]
}

export default createProject

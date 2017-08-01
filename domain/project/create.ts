import { PublicationEvents } from 'domain/publication/types/PublicationEvents'
import { ProjectEvents } from './types/ProjectEvents'
import ProjectCreated from './events/ProjectCreated'
import getPublicationState from './state/publication'

function create (
  history: PublicationEvents,
  projectId: string,
  publicationId: string,
  userId: number,
  name: string,
  description: string,
  link: string
): ProjectEvents {
  const publication = getPublicationState(history)

  if (!publication.conditions || publication.conditions.length === 0) {
    throw new Error('Missing publication conditions')
  }

  return [
    new ProjectCreated(
      projectId,
      publicationId,
      publication.conditions,
      userId,
      name,
      description,
      link
    )
  ]
}

export default create

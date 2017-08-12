import { CreatePublication, PublicationCreated } from 'domain/ul'

function create (c: CreatePublication): [PublicationCreated] {
  return [
    {
      type: 'PublicationCreated',
      publicationId: c.publicationId,
      owner: c.owner,
      conditions: c.conditions,
      title: c.title,
      description: c.description,
      timestamp: c.timestamp
    }
  ]
}

export default create

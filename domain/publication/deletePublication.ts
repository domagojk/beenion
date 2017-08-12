import { DeletePublication, PublicationDeleted } from 'domain/ul'

function deletePublication (c: DeletePublication): [PublicationDeleted] {
  return [
    {
      type: 'PublicationDeleted',
      publicationId: c.publicationId,
      timestamp: c.timestamp
    }
  ]
}

export default deletePublication

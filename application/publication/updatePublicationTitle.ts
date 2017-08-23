import { UpdatePublicationTitle, PublicationTitleUpdated } from 'domain/UL'

function updatePublicationTitle (c: UpdatePublicationTitle): [PublicationTitleUpdated] {
  return [
    {
      type: 'PublicationTitleUpdated',
      publicationId: c.publicationId,
      title: c.title,
      timestamp: c.timestamp
    }
  ]
}

export default updatePublicationTitle

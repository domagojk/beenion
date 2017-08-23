import { UpdatePublicationDescription, PublicationDescriptionUpdated } from 'domain/UL'

function updatePublicationDescription (c: UpdatePublicationDescription): [PublicationDescriptionUpdated] {
  return [
    {
      type: 'PublicationDescriptionUpdated',
      publicationId: c.publicationId,
      describtion: c.describtion,
      timestamp: c.timestamp
    }
  ]
}

export default updatePublicationDescription

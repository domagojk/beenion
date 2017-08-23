import { UpdatePublicationConditions, PublicationConditionsUpdated } from 'domain/UL'

function updateConditions (c: UpdatePublicationConditions): [PublicationConditionsUpdated] {
  return [
    {
      type: 'PublicationConditionsUpdated',
      publicationId: c.publicationId,
      conditions: c.conditions,
      timestamp: c.timestamp
    }
  ]
}

export default updateConditions

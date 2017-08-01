import { PublicationEvents } from './types/PublicationEvents'
import { PublicationConditions } from './types/PublicationConditions'
import PublicationConditionsUpdated from './events/PublicationConditionsUpdated'
import getPublicationState from './state/publication'
import isUniqueCondition from './rules/isUniqueCondition'

function updateConditions (
  history: PublicationEvents,
  publicationId: string,
  conditions: PublicationConditions
): PublicationEvents {
  const publication = getPublicationState(history)

  if (!publication || !publication.id) {
    throw new Error('Publication does not exists.')
  }

  for (let c of conditions) {
    if (!isUniqueCondition(c)) {
      throw new Error('Only one condition per stage can be specified.')
    }
  }

  return [
    new PublicationConditionsUpdated(publicationId, conditions)
  ]
}

export default updateConditions

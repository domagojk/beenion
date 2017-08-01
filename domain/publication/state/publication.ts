import { calcState } from 'domain/utils'
import PublicationCreated from 'domain/publication/events/PublicationCreated'
import PublicationConditionsUpdated from 'domain/publication/events/PublicationConditionsUpdated'
import { PublicationConditions } from '../types/PublicationConditions'
import { PUBLICATION_CREATED, PUBLICATION_CONDITIONS_UPDATED } from 'domain/constants'

interface State {
  id: string,
  owner: number,
  name: string,
  description: string,
  conditions: PublicationConditions,
}

export const eventHandlers = {
  [PUBLICATION_CREATED]: (state: State, event: PublicationCreated): State => ({
    id: event.publicationId,
    owner: event.owner,
    name: event.name,
    description: event.description,
    conditions: [{
      threshold: 0
    }]
  }),

  [PUBLICATION_CONDITIONS_UPDATED]: (state: State, event: PublicationConditionsUpdated): State => ({
    ...state,
    conditions: event.conditions
  })
}

export default history => calcState(eventHandlers, history) as State

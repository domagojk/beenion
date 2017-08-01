import { calcState } from 'domain/utils'
import { PublicationConditions } from 'domain/publication/types/PublicationConditions'
import PublicationConditionsUpdated from 'domain/publication/events/PublicationConditionsUpdated'
import PublicationCreated from 'domain/publication/events/PublicationCreated'
import { PUBLICATION_CONDITIONS_UPDATED, PUBLICATION_CREATED } from 'domain/constants'

interface State {
  conditions: PublicationConditions
}

export const eventHandlers = {
  [PUBLICATION_CREATED]: (state, event: PublicationCreated): State => ({
    conditions: event.conditions
  }),

  [PUBLICATION_CONDITIONS_UPDATED]: (state, event: PublicationConditionsUpdated): State => ({
    conditions: event.conditions
  })
}

export default history => calcState(eventHandlers, history) as State

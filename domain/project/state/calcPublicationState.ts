import { PublicationCondition, PublicationEvent } from 'domain/UL'

type State = {
  conditions: PublicationCondition[]
}

const initialState = {
  conditions: null
}

function reducer (state: State, e: PublicationEvent): State {
  switch (e.type) {
    case 'PublicationCreated':
      return {
        conditions: e.conditions
      }
    case 'PublicationConditionsUpdated':
      return {
        conditions: e.conditions
      }
    default:
      return state
  }
}

export default (history: PublicationEvent[]): State =>
  history.reduce(reducer, initialState)

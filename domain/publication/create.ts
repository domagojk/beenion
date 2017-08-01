import { PublicationEvents } from './types/PublicationEvents'
import PublicationCreated from './events/PublicationCreated'
import { PublicationConditions } from './types/PublicationConditions'
import isUniqueCondition from './rules/isUniqueCondition'

function create (
  id: string,
  owner: number,
  name: string,
  description: string,
  conditions: PublicationConditions
): PublicationEvents {

  for (let c of conditions) {
    if (!isUniqueCondition(c)) {
      throw new Error('Only one condition per stage can be specified.')
    }
  }

  return [
    new PublicationCreated(id, owner, name, description, conditions)
  ]
}

export default create

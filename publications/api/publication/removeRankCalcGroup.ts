import { PublicationEvent } from 'domain/types/events'
import { canUpdateRankCalcParams } from 'domain/businessRules'
import { PUBLICATION_RANKCALCPARAMS_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationHistory,
  createRankGroup,
  createTimestamp
} from 'domain/typeFactories'

function removeRankCalcGroup (command: {
  userHistory: object[]
  publicationHistory: object[]
  group: string
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const group = createRankGroup(command.group)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canUpdateRankCalcParams(user, publication)) {
    throw new Error(PUBLICATION_RANKCALCPARAMS_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationRankCalcGroupRemoved',
      publicationId: publication.publicationId,
      group,
      timestamp
    }
  ]
}

export default removeRankCalcGroup

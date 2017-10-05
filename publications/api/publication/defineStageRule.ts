import { PublicationEvent } from 'domain/types/events'
import { canDefineStageRule } from 'domain/businessRules'
import { PUBLICATION_STAGE_RULES_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationHistory,
  createStage,
  createStageRule,
  createTimestamp
} from 'domain/typeFactories'

function defineStageRule (command: {
  userHistory: object[]
  publicationHistory: object[]
  stage: number
  stageRule: object
  timestamp: number
}): PublicationEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const stage = createStage(command.stage)
  const stageRule = createStageRule(command.stageRule)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canDefineStageRule(user, publication, stage)) {
    throw new Error(PUBLICATION_STAGE_RULES_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'PublicationStageRuleDefined',
      publicationId: publication.publicationId,
      stage,
      stageRule,
      timestamp
    }
  ]
}

export default defineStageRule

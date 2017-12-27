import { NewsletterEvent, User, Newsletter, Stage, Timestamp } from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function removeStageRule (params: {
  user: User
  newsletter: Newsletter
  stage: Stage
  timestamp: Timestamp
}): NewsletterEvent[] {
  const { user, newsletter, stage, timestamp } = params

  if (newsletter.stageRules[stage] === undefined) {
    throw errors.stageNotDefined()
  }

  if (newsletter.stageRules[stage + 1] !== undefined) {
    throw errors.stageNotFinal()
  }

  if (privileges.canUpdateStageRules(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterStageRuleRemoved',
      payload: {
        newsletterId: newsletter.newsletterId,
        stage,
        timestamp
      }
    }
  ]
}

import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function defineStageRule (params: {
  user: t.User
  newsletter: t.Newsletter
  stage: t.Stage
  stageRule: t.StageRule
  timestamp: t.Timestamp
}): t.NewsletterEvent[] {
  const { user, newsletter, stage, stageRule, timestamp } = params

  if (stage > newsletter.stageRules.length) {
    throw errors.stageTooLarge()
  }

  if (!privileges.canUpdateStageRules(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterStageRuleDefined',
      payload: {
        newsletterId: newsletter.newsletterId,
        stage,
        stageRule,
        timestamp
      }
    }
  ]
}

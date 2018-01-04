import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function defineNewsletterStageRule (
  user: t.User,
  newsletter: t.Newsletter,
  stage: t.Stage,
  stageRule: t.StageRule,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

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

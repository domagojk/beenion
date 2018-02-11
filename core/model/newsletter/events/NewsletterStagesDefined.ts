import { NewsletterCommands } from '../../types'

export const NewsletterStagesDefined = (
  command:
    | NewsletterCommands['DefineNewsletterStages']
    | NewsletterCommands['CreateNewsletter']
) => () => ({
  type: 'NewsletterStagesDefined',
  payload: {
    newsletterId: command.payload.newsletterId,
    userId: command.userId,
    stages: command.payload.stages,
    timestamp: command.payload.timestamp
  }
})

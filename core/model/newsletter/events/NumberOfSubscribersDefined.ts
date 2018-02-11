import { NewsletterCommands } from '../../types'

export const NumberOfSubscribersDefined = (
  command:
    | NewsletterCommands['DefineNumberOfSubscribers']
    | NewsletterCommands['CreateNewsletter']
) => () => ({
  type: 'NumberOfSubscribersDefined',
  payload: {
    newsletterId: command.payload.newsletterId,
    userId: command.userId,
    maxSubscribers: command.payload.maxSubscribers,
    timestamp: command.payload.timestamp
  }
})

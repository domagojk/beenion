import { NewsletterCommands } from '../../types'

export const NewsletterCreated = (
  command: NewsletterCommands['CreateNewsletter']
) => () => ({
  type: 'NewsletterCreated',
  payload: {
    newsletterId: command.payload.newsletterId,
    ownerId: command.userId,
    timestamp: command.payload.timestamp
  }
})

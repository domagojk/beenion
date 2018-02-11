import { NewsletterCommands } from '../../types'

export const NewsletterPermissionsDefined = (
  command:
    | NewsletterCommands['DefineNewsletterPermissions']
    | NewsletterCommands['CreateNewsletter']
) => () => ({
  type: 'NewsletterPermissionsDefined',
  payload: {
    newsletterId: command.payload.newsletterId,
    userId: command.userId,
    stages: command.payload.permissions,
    timestamp: command.payload.timestamp
  }
})

import { NewsletterCommands } from '../../types'

export const ProposalExpireTimeDefined = (
  command:
    | NewsletterCommands['DefineProposalExpireTime']
    | NewsletterCommands['CreateNewsletter']
) => () => ({
  type: 'ProposalExpireTimeDefined',
  payload: {
    newsletterId: command.payload.newsletterId,
    userId: command.userId,
    expireTime: command.payload.expireTime,
    timestamp: command.payload.timestamp
  }
})

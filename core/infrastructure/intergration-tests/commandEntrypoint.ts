import * as linkCommands from '../../domain/types/link/commands'
import * as newsletterCommands from '../../domain/types/newsletter/commands'
import { linkCommandHandlers } from '../../commandHandlers/link'
import { newsletterCommandHandlers } from '../../commandHandlers/newsletter'
import { newsletterRepository } from '../../repositories/inMemory/newsletter'
import { linkRepository } from '../../repositories/inMemory/link'
import { validateCommand } from '../../domain/validateCommand'

const commandHandlers = {
  ...linkCommandHandlers(newsletterRepository, linkRepository),
  ...newsletterCommandHandlers(newsletterRepository)
}
const commandTypes = {
  ...linkCommands.publicCommands.props,
  ...newsletterCommands.publicCommands.props
}

export const handler = async (event, _context, callback) => {
  console.log(event)

  // command body is parsed
  let postParams
  try {
    postParams = JSON.parse(event.body)
  } catch (e) {
    console.log(e)
  }

  if (!postParams || !postParams.command) {
    return callback('invalid command')
  }

  // command consist of userId (from principalId)
  // payload and name
  const command = {
    userId: event.requestContext.authorizer.principalId,
    payload: postParams.command.payload,
    name: postParams.command.name
  }

  // validating command input (using io-ts)
  const errors = validateCommand(command, commandTypes[command.name])

  if (errors.length) {
    return callback(JSON.stringify(errors))
  }

  // command handler coresponds to command name
  const commandHandler = commandHandlers[command.name]

  if (!commandHandler) {
    return callback('command not supported')
  }

  try {
    const response = await commandHandler(command)

    console.log('command handler response', response)

    return callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'command accepted' })
    })
  } catch (e) {
    return callback(
      typeof e === 'string' ? e : e.message || 'Error performing request'
    )
  }
}

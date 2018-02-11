import * as articleCommands from '../../domain/types/article/commands'
import * as newsletterCommands from '../../domain/types/newsletter/commands'
import * as userCommands from '../../domain/types/user/commands'
import { articleCommandHandlers } from '../../commandHandlers/article'
import { newsletterCommandHandlers } from '../../commandHandlers/newsletter'
import { userCommandHandlers } from '../../commandHandlers/user'
import { newsletterRepository } from '../../repositories/dynamodb/newsletter'
import { userRepository } from '../../repositories/dynamodb/user'
import { articleRepository } from '../../repositories/dynamodb/article'
import { validateCommand } from './validateCommand'

const commandHandlers = {
  ...articleCommandHandlers(userRepository, newsletterRepository, articleRepository),
  ...newsletterCommandHandlers(userRepository, newsletterRepository),
  ...userCommandHandlers(userRepository, newsletterRepository)
}
const commandTypes = {
  ...articleCommands.publicCommands.props,
  ...newsletterCommands.publicCommands.props,
  ...userCommands.publicCommands.props
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

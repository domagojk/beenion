import 'source-map-support/register'
import Joi from 'joi'
import { dynamoDbEventStore } from '../../infrastructure/databases/eventstore/dynamoDbEventStore'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { parseObject } from '../../infrastructure/http/parseEventBody'
import { userCommandHandlers } from '../../application/user'
import {
  makeSuccessResponse,
  makeErrorResponse
} from '../../infrastructure/http/makeResponse'

export const handler = async (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeErrorResponse(401, 'access denied'))
  }

  const payloadSchemas = {
    follow: Joi.object({
      username: Joi.string().required()
    }),
    unfollow: Joi.object({
      username: Joi.string().required()
    })
  }

  const command = parseObject(event.body)
  if (!command || !command.type || !command.payload) {
    return cb(null, makeErrorResponse(400, 'invalid command'))
  }

  if (!payloadSchemas[command.type]) {
    return cb(null, makeErrorResponse(400, `${command.type} command not found`))
  }

  const { error } = Joi.validate(
    command,
    Joi.object().keys({
      type: Joi.string().valid(...Object.keys(payloadSchemas)),
      payload: payloadSchemas[command.type]
    })
  )

  if (error) {
    return cb(null, makeErrorResponse(400, error))
  }

  const commandHandler = userCommandHandlers(dynamoDbEventStore, userId)[
    command.type
  ]

  return commandHandler(command.payload)
    .then(res => cb(null, makeSuccessResponse({})))
    .catch(err => cb(null, makeErrorResponse(err)))
}

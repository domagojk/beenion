import 'source-map-support/register'
import Joi from 'joi'
import { dynamoDbEventStore } from '../../infrastructure/databases/eventstore/dynamoDbEventStore'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { parseObject } from '../../infrastructure/http/parseEventBody'
import { linkCommandHandlers } from '../../application/link'
import {
  makeErrorResponse,
  makeSuccessResponse
} from '../../infrastructure/http/makeResponse'

export const handler = async (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeErrorResponse(401, 'access denied'))
  }

  // console.log(userId, event.body)

  const payloadSchemas = {
    rate: Joi.object({
      linkUrl: Joi.string().required(),
      title: Joi.string(),
      rating: Joi.number().required(),
      image: Joi.string(),
      tags: Joi.array().items(Joi.string())
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

  const commandHandler = linkCommandHandlers(dynamoDbEventStore, userId)[
    command.type
  ]

  return commandHandler(command.payload)
    .then(res => cb(null, makeSuccessResponse({})))
    .catch(err => cb(null, makeErrorResponse(err)))
}

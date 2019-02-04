import 'source-map-support/register'
import Joi from 'joi'
import { dynamoDbEventStore } from '../../infrastructure/databases/eventstore/dynamoDbEventStore'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { makeResponse } from '../../infrastructure/http/makeResponse'
import { parseObject } from '../../infrastructure/http/parseEventBody'
import { userCommandHandlers } from '../../application/user/user'

export const handler = async (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeResponse(401, 'access denied'))
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
    return cb(null, makeResponse(400, 'invalid command'))
  }

  const { error } = Joi.validate(
    command,
    Joi.object().keys({
      type: Joi.string().valid(...Object.keys(payloadSchemas)),
      payload: payloadSchemas[command.type]
    })
  )

  if (error) {
    return cb(null, makeResponse(400, error))
  }

  const commandHandler = userCommandHandlers(dynamoDbEventStore, userId)[
    command.type
  ]

  return commandHandler(command.payload)
    .then(res => cb(null, makeResponse(200, {})))
    .catch(err => {
      console.error(err)
      cb(
        null,
        makeResponse(err.statusCode || 500, {
          message: err.message,
          errorCode: err.code
        })
      )
    })
}

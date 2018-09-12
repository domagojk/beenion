import 'source-map-support/register'
import Joi from 'joi'
import { makeResponse } from './common/makeResponse'
import { parseObject } from './common/parseEventBody'
import { dynamoDbEventStore } from '../../databases/eventstore/dynamoDbEventStore'
import { linkCommandHandlers } from '../../commandHandlers/link'
import { getUserData } from './common/getUserdata'

export const handler = async (event, context, cb) => {
  const userData = getUserData(event)

  if (!userData) {
    return cb(null, makeResponse(401, 'access denied'))
  }

  const payloadSchemas = {
    rate: Joi.object({
      linkUrl: Joi.string(),
      title: Joi.string(),
      rating: Joi.number(),
      image: Joi.string(),
      tags: Joi.array().items(Joi.string())
    })
  }

  const command = parseObject(event.body)
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

  const commandHandler = linkCommandHandlers(dynamoDbEventStore, userData)[
    command.data.type
  ]

  return commandHandler(command.data.payload)
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

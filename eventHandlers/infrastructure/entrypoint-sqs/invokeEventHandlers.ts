import { Lambda } from 'aws-sdk'
import { dynamoDbEventStore } from '../../../databases/eventstore/dynamoDbEventStore'

const region = 'eu-west-1'
const eventHandlerLambda = 'trainingtube-projections-prod-eventHandler'
const lambda = new Lambda({ region })

type Message = {
  streamId: string
  version: string
  offset?: number
}

export function invokeEventHandlers(message: Message, queueName: string) {
  return dynamoDbEventStore
    .getByIdAndVersion(message.streamId, parseInt(message.version))
    .then(events => {
      return lambda
        .invoke({
          FunctionName: eventHandlerLambda,
          Payload: JSON.stringify({
            queueName,
            event: events[message.offset || 0]
          }),
          InvocationType: 'RequestResponse',
          LogType: 'Tail'
        })
        .promise()
        .then(res => {
          // check if responded with errors
          const response = JSON.parse(res.Payload.toString())
          if (!response) {
            return true
          }
          const error = response.errorMessage || response.errorType
          if (error) {
            throw new Error(error.toString())
          }
          return response
        })
    })
}

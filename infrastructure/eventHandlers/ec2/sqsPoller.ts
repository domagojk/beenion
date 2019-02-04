import sqsConsumer from 'sqs-consumer'
import { Lambda } from 'aws-sdk'
import { sqsEventHandlerQueues } from '../sqsEventHandlerQueues'
import { dynamoDbEventStore } from '../../databases/eventstore/dynamoDbEventStore'

const eventHandlerLambda = 'api-dev-ec2ToEventHandlers'
const region = process.env.REGION || 'us-east-1'
const lambda = new Lambda({ region })

function invokeEventHandlers(
  message: {
    streamId: string
    version: string
    offset?: number
  },
  queueName: string
) {
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

sqsEventHandlerQueues.map(queueName => {
  console.log('starting sqs pool on', queueName)
  const app = sqsConsumer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/798099338267/' + queueName,
    handleMessage: (res, done) => {
      const message = JSON.parse(res.Body)
      console.log('got', message)
      return invokeEventHandlers(message, queueName)
        .then(() => {
          console.log('done', message.streamId, message.version)
          done()
        })
        .catch(err => {
          console.log('err', err)
          done(err)
        })
    }
  })

  app.on('error', err => {
    console.log(queueName, err.message)
  })

  app.start()
})

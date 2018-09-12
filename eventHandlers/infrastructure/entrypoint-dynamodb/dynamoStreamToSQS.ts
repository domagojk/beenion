import { SQS } from 'aws-sdk'
import { sqsEventHandlerQueues } from '../sqsEventHandlerQueues'

const region = process.env.REGION
const sqsUrlPrefix = process.env.SQS_URL_PREFIX
const sqs = new SQS({ region })

export const handler = (event, context, cb) => {
  const streamId = event.Records[0].dynamodb.NewImage.streamId.S
  const version = event.Records[0].dynamodb.NewImage.version.N
  const events = JSON.parse(event.Records[0].dynamodb.NewImage.events.S)

  return Promise.all(
    sqsEventHandlerQueues.map(
      (queue): Promise<any> => {
        if (events.length == 1) {
          return sqs
            .sendMessage({
              QueueUrl: sqsUrlPrefix + queue,
              MessageGroupId: 'domainevent',
              MessageBody: JSON.stringify({
                streamId,
                version
              })
            })
            .promise()
        } else if (events.length <= 10) {
          return sqs
            .sendMessageBatch({
              QueueUrl: sqsUrlPrefix + queue,
              Entries: createArray(events.length).map(i => ({
                Id: String(i),
                MessageGroupId: 'domainevent',
                MessageBody: JSON.stringify({
                  streamId,
                  version,
                  offset: i
                })
              }))
            })
            .promise()
        } else {
          throw Error('commits of more than 10 messages are not supported')
        }
      }
    )
  )
}

function createArray(N) {
  return Array.apply(null, { length: N }).map(Number.call, Number)
}

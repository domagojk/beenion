import { SQS } from 'aws-sdk'
import { sqsEventHandlerQueues } from '../sqsEventHandlerQueues'

const region = process.env.REGION
const sqsUrlPrefix = process.env.SQS_URL_PREFIX
const sqs = new SQS({ region })

export const handler = (event, context, cb) => {
  if (!event.Records[0].dynamodb.NewImage) {
    // ignore if something is deleted from dynamo manually
    return cb(null)
  }
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
        } else {
          const batchLength = 10
          return Promise.all(
            createChunks(events, batchLength).map((batch, batchIndex) =>
              sqs
                .sendMessageBatch({
                  QueueUrl: sqsUrlPrefix + queue,
                  Entries: createArray(batch.length).map(i => ({
                    Id: String(batchIndex * batchLength + i),
                    MessageGroupId: 'domainevent',
                    MessageBody: JSON.stringify({
                      streamId,
                      version,
                      offset: batchIndex * batchLength + i
                    })
                  }))
                })
                .promise()
            )
          )
        }
      }
    )
  )
    .then(() => cb(null))
    .catch(err => {
      console.log(err)
      cb(err)
    })
}

function createArray(N) {
  return Array.apply(null, { length: N }).map(Number.call, Number)
}

function createChunks(array, chunkSize) {
  return [].concat.apply(
    [],
    array.map(function(elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
    })
  )
}

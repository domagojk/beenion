import sqsConsumer from 'sqs-consumer'
import { invokeEventHandlers } from './invokeEventHandlers'
import { sqsEventHandlerQueues } from '../sqsEventHandlerQueues'

sqsEventHandlerQueues.map(queueName => {
  console.log('starting sqs longpool on', queueName)
  const app = sqsConsumer.create({
    queueUrl: queueName,
    handleMessage: (res, done) => {
      const message = JSON.parse(res.Body)

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

import { SNS } from 'aws-sdk'

export const publishEventCreatedToSNS = cb => {
  const sns = new SNS()

  sns.publish(
    {
      TopicArn: process.env.EVENT_NOTIFICATION_TOPIC_ARN,
      Message: 'event_created'
    },
    (err, data) => {
      if (err) {
        console.error(err)
        return cb(err)
      }
      cb(null)
    }
  )
}

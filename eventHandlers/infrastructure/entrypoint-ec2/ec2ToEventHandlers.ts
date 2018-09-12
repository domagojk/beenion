import { Event } from '../../../model/eventTypes'
import { getStreamProjection } from '../../projections/getStreamProjection'

type Payload = {
  event: Event
  queueName: string
}

const projections = {
  'eventhandler_getstream.fifo': getStreamProjection
}

export const handler = (payload: Payload, context, cb) => {
  const { queueName, event } = payload
  const projectionHandler = projections[queueName]

  if (!projectionHandler) {
    return cb('no handler found')
  }

  return projectionHandler(event)
    .then(() => cb(null))
    .catch(err => {
      console.log(err)
      cb(err)
    })
}

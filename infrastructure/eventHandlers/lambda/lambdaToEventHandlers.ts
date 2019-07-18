import { Event } from '../../../model/eventTypes'
import { getStreamProjection } from '../../../ports/eventHandlers/projection-getstream/getStreamProjection'
import { linkDetailsProjection } from '../../../ports/eventHandlers/projection-linkdetails/linkDetailsProjection'

type Payload = {
  event: Event
  queueName: string
}

const projections = {
  [process.env.GETSTREAM_QUEUE]: getStreamProjection,
  [process.env.COSMOS_QUEUE]: linkDetailsProjection
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

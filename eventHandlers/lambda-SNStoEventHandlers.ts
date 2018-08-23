import { invokeEventHandler } from '../adapters/eventstore/aws/invokeEventHandler'
import { getStreamfollowEventHandler } from '../eventHandlers/getStreamFollowStatus'
import { getStreamRateLinkEventHandler } from '../eventHandlers/getStreamRateLink'

export const handler = (event, context, cb) => {
  // event is not used since each handler queries eventStore
  // from its last saved position
  // invokeEventHandler ensures all events are processed in order
  // in batch of 10 events

  Promise.all([
    invokeEventHandler('GetStreamFollowStatus', getStreamfollowEventHandler),
    invokeEventHandler('GetStreamRateLink', getStreamRateLinkEventHandler)
  ])
    .then(() => cb(null))
    .catch(err => {
      console.log(err)
      cb(err)
    })
}

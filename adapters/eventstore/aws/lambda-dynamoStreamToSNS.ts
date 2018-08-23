import { publishEventCreatedToSNS } from './publishEventCreatedToSNS'

export const dynamoStreamToSNS = (event, context, cb) => {
  publishEventCreatedToSNS(cb)
}

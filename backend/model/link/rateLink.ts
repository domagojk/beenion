import { UserData } from '../userdata'
import { validationError } from '../errors'
import { Event } from '../eventTypes'

export function rateLink(params: {
  linkId: string
  rating: number
  user: UserData
}): Event[] {
  if (params.rating <= 0 || params.rating >= 100) {
    throw validationError('rating must be in 0-100 range', params)
  }

  return [
    {
      type: 'LINK_RATED',
      payload: {
        linkId: params.linkId,
        rating: params.rating,
        userId: params.user.userId
      }
    }
  ]
}

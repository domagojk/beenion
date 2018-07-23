import { UserData } from '../userdata'
import { Event } from '../eventTypes'

export function updateLinkImage(params: {
  linkId: string
  image: string
  user: UserData
}): Event[] {
  return [
    {
      type: 'LINK_IMAGE_UPDATED',
      payload: {
        linkId: params.linkId,
        image: params.image,
        userId: params.user.userId
      }
    }
  ]
}

import { UserData } from '../userdata'
import { Event } from '../eventTypes'

export function createLink(params: {
  linkId: string
  linkUrl: string
  user: UserData
}): Event[] {
  return [
    {
      type: 'LINK_CREATED',
      payload: {
        linkId: params.linkId,
        linkUrl: params.linkUrl,
        userId: params.user.userId
      }
    }
  ]
}

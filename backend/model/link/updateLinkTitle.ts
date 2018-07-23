import { UserData } from '../userdata'
import { Event } from '../eventTypes'

export function updateLinkTitle(params: {
  linkId: string
  title: string
  user: UserData
}): Event[] {
  return [
    {
      type: 'LINK_TITLE_UPDATED',
      payload: {
        linkId: params.linkId,
        title: params.title,
        userId: params.user.userId
      }
    }
  ]
}

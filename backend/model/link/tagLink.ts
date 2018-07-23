import { UserData } from '../userdata'
import { Event } from '../eventTypes'
import { Link } from './link'

export function tagLink(params: {
  linkId: string
  tags: string[]
  link?: Link
  user: UserData
}): Event[] {
  const currentTags = params.link ? params.link.tags : []

  const addedTags = params.tags.filter(tag => !currentTags.includes(tag))
  const removedTags = currentTags.filter(tag => !params.tags.includes(tag))

  return [
    ...addedTags.map(tag => {
      return {
        type: 'LINK_TAG_ADDED',
        payload: {
          linkId: params.linkId,
          userId: params.user.userId,
          tag
        }
      } as Event
    }),
    ...removedTags.map(tag => {
      return {
        type: 'LINK_TAG_REMOVED',
        payload: {
          linkId: params.linkId,
          userId: params.user.userId,
          tag
        }
      } as Event
    })
  ]
}

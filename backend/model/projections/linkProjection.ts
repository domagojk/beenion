import { Event } from '../eventTypes'
import { Link } from '../link/link'

export function linkProjection(events: Event[]): Link {
  return events.reduce(
    (link: Link, e): Link => {
      switch (e.type) {
        case 'LINK_CREATED': {
          return {
            ...link,
            linkId: e.payload.linkId,
            url: e.payload.linkUrl,
            userId: e.payload.userId
          }
        }
        case 'LINK_TITLE_UPDATED': {
          return {
            ...link,
            title: e.payload.title
          }
        }
        case 'LINK_IMAGE_UPDATED': {
          return {
            ...link,
            image: e.payload.image
          }
        }
        case 'LINK_RATED': {
          return {
            ...link,
            rating: e.payload.rating
          }
        }
        case 'LINK_TAG_ADDED': {
          return {
            ...link,
            tags: [...link.tags, e.payload.tag]
          }
        }
        case 'LINK_TAG_REMOVED': {
          return {
            ...link,
            tags: link.tags.filter(tag => tag !== e.payload.tag)
          }
        }
        default:
          return link
      }
    },
    {
      tags: []
    }
  )
}

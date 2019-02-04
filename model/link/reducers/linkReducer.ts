import { Event } from '../../eventTypes'

export type Link = {
  linkId?: string
  userId?: string
  url?: string
  title?: string
  image?: string
  rating?: number
  tags: string[]
  created?: number
}

export function linkReducer(
  events: Event[],
  initialState = {
    tags: []
  }
): Link {
  return events.reduce((link: Link, e): Link => {
    switch (e.type) {
      case 'LINK_CREATED': {
        return {
          ...link,
          linkId: e.payload.linkId,
          url: e.payload.linkUrl,
          userId: e.payload.userId,
          created: e.committedAt
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
      case 'LINK_TAGGED': {
        return {
          ...link,
          tags: e.payload.tags
        }
      }
      default:
        return link
    }
  }, initialState)
}

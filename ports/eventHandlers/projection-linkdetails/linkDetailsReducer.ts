import md5 from 'md5'
import { Event } from '../../../model/eventTypes'

export type Link = {
  linkHash?: string
  userId?: string
  url?: string
  title?: string
  image?: string
  latestRating?: number
  averageRating?: number
  ratings?: Record<string, { rating: number; linkId: string }>
  tags?: string[]
  created?: number
}

export function linkDetailsReducer(
  events: Event[],
  initialState: Link = {
    tags: []
  }
): Link {
  return events.reduce((link: Link, e): Link => {
    switch (e.type) {
      case 'LINK_CREATED': {
        return {
          ...link,
          linkHash: md5(e.payload.linkUrl),
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
        const newLink = {
          ...link,
          latestRating: e.payload.rating,
          ratings: {
            ...link.ratings,
            [e.payload.userId]: {
              rating: e.payload.rating,
              linkId: e.payload.linkId
            }
          }
        }
        const sum = Object.keys(newLink.ratings).reduce((acc, userId) => {
          return acc + newLink.ratings[userId].rating
        }, 0)

        return {
          ...newLink,
          averageRating: sum / Object.keys(newLink.ratings).length
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

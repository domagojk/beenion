import { Link } from '../reducers/linkReducer'
import { validationError } from '../../errors'
import { Event } from '../../eventTypes'

type Params = {
  link: Link
  linkId: string
  linkUrl: string
  userId: string
  title: string
  image: string
  rating: number
  tags: string[]
}

export function rate(params: Params): Event[] {
  const createEvents: Event[] =
    params.link.linkId === undefined
      ? [
          {
            type: 'LINK_CREATED',
            payload: {
              linkId: params.linkId,
              linkUrl: params.linkUrl,
              userId: params.userId
            }
          }
        ]
      : [] // empty array since link is already created

  const rateEvents: Event[] = [
    params.title && {
      type: 'LINK_TITLE_UPDATED',
      payload: {
        linkId: params.linkId,
        linkUrl: params.linkUrl,
        title: params.title,
        userId: params.userId
      }
    },
    params.image && {
      type: 'LINK_IMAGE_UPDATED',
      payload: {
        linkId: params.linkId,
        linkUrl: params.linkUrl,
        image: params.image,
        userId: params.userId
      }
    },
    params.rating !== undefined &&
      isValidRating(params.rating) && {
        type: 'LINK_RATED',
        payload: {
          linkId: params.linkId,
          linkUrl: params.linkUrl,
          rating: params.rating,
          userId: params.userId
        }
      },
    params.tags && {
      type: 'LINK_TAGGED',
      payload: {
        linkId: params.linkId,
        linkUrl: params.linkUrl,
        tags: params.tags,
        userId: params.userId
      }
    }
  ]

  return [...createEvents, ...rateEvents]
}

function isValidRating(rating: number) {
  if (rating < 0 || rating > 100) {
    throw validationError('rating must be in 0-100 range')
  }

  return true
}

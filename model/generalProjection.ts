import { Event } from './types'

type ResourceBasicData = {
  id: string
  owner: string
  type: 'newsletter' | 'article'
}

export function generalProjection(events: Event[]): ResourceBasicData {
  const resource = events.reduce(
    (acc, e): ResourceBasicData => {
      switch (e.type) {
        case 'ARTICLE_CREATED':
          return {
            id: e.data.articleId,
            type: 'article',
            owner: e.data.userId
          }
        default:
          return acc
      }
    },
    {
      id: null,
      type: null,
      owner: null
    }
  )

  return resource
}

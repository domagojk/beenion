import { UserId } from '../user/types'

export type Subscriber = {
  userId: UserId
  status: 'avaiable' | 'unavaiable'
  assigned: number
  canceled: number
  agreed: number
  disagreed: number
  similarityRank: number
}

export type QueryParams = {
  newsletterId: string
  minSimilarityRank: number
  minReviews: number
  exclude: UserId[]
  limit: number
}

export type FindSubscriber = {
  subscriberId: string
  newsletterId: string
}

export type SubscriberRepository = {
  getById: (params: FindSubscriber) => Promise<Subscriber>
  query: (params: QueryParams) => Promise<Subscriber[]>
}

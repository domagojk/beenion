import { UserId } from '../../model/user/types'

type FindSubscriber = {
  subscriberId: string
  newsletterId: string
}

type FindSubscriberQuery = {
  newsletterId: string
  minSimilarityRank: number
  minReviews: number
  exclude: UserId[]
  limit: number
}

export type SubscriberRepo<Subscriber> = {
  getByIds: (params: FindSubscriber) => Promise<Subscriber>
  find: (params: FindSubscriberQuery) => Promise<Subscriber[]>
}

import { UserId } from '../user/types'
import { SubscriberRepo } from '../../repositories/subscriber/types'
import { Newsletter } from '../newsletter'
import { SingleDocRepo } from 'repositories/singleDoc/types'

export type Subscriber = {
  userId: UserId
  status: 'avaiable' | 'unavaiable'
  assigned: number
  canceled: number
  agreed: number
  disagreed: number
  similarityRank: number
}

type Repositories = {
  newsletterRepo: SingleDocRepo<Newsletter>
  subscriberRepo: SubscriberRepo<Subscriber>
}

export const subscriberApi = ({ newsletterRepo, subscriberRepo }: Repositories) => ({
  async get(newsletterId: string, subscriberId: string) {
    const subscriber = await subscriberRepo.getByIds({
      newsletterId,
      subscriberId
    })
    return subscriber
  },

  async add() {
    // check newsletter settings
  },

  async remove() {
    // check permissions
  },

  async updateStatus() {
    // check if from is subscriber
  },

  async updateStats() {
    // only update stats
  }
})

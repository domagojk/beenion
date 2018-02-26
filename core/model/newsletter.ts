import * as t from 'io-ts'
import { db } from './db/inMemory'
import { User } from './user'

const newsletter = t.type({
  newsletterId: t.string,
  title: t.string,
  description: t.string,
  editors: t.array(t.string),
  categories: t.array(t.string),
  stages: t.array(
    t.type({
      minSimilarityRank: t.number,
      minReviews: t.number
    })
  ),
  maxSubscribers: t.number
})

type Newsletter = t.TypeOf<typeof newsletter>

type NewsletterApi = {
  create: (user: User, newsletter: Newsletter) => Promise<Newsletter>
  update: (user: User, newsletter: Newsletter) => Promise<Newsletter>
}

export const newsletterApi: NewsletterApi = {
  create (user, newsletter) {
    return db.save(newsletter.newsletterId, newsletter)
  },

  update (user, newsletter) {
    // if (newsletter.editors)
    return db.update(newsletter.newsletterId, newsletter)
  }
}
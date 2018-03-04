export type Newsletter = {
  newsletterId: string
  title: string
  description: string
  editors: string[]
  categories: string[]
  stages: {
    minSimilarityRank: number
    minReviews: number
    reviewers: number
    limit: number
  }[]
  maxSubscribers: number
}

export type NewsletterRepository = {
  get: (id: string) => Promise<Newsletter>
  create: (event: Event) => Promise<Newsletter>
  save: (event: Event) => Promise<Newsletter>
  delete: (event: Event) => Promise<Newsletter>
}

export type NewsletterParams = Partial<Newsletter> & { newsletterId: string }

export type Event = {
  id: NewsletterParams['newsletterId']
  payload: NewsletterParams
  type: string
}

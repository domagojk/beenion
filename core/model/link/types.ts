import { UserId } from '../user/types'

export type Link = {
  linkId: string
  newsletterId: string
  status: 'pending' | 'inReview' | 'rejected' | 'approved'
  title: string
  description: string
  url: string
  userId: UserId
  stage: number
  reviews: {
    [key in UserId]: {
      stage: number
      evaluation: Evaluation
    }
  }
}

export type LinkRepository = {
  get: (id: string) => Promise<Link>
  create: (event: Event) => Promise<Link>
  save: (event: Event) => Promise<Link>
  commit: (event: Event) => Promise<CommitRes>
  delete: (event: Event) => Promise<Link>
  saveCommited: (params: CommitRes) => Promise<Link>
}

export type Evaluation = null | 'approved' | 'rejected'

export type LinkParams = Partial<Link> & { linkId: string }

export type Event = {
  id: LinkParams['linkId']
  payload: LinkParams
  type: string
}

export type CommitRes = {
  link: Link
  commit: LinkRepository['commit']
}

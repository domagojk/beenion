import * as t from 'io-ts'

const CreateNewsletter = t.type({
  newsletterId: t.string,
  editors: t.array(t.string)
})

type Stage = {
  
}

type Newsletter = {
  newsletterId: string
  editors: string[]
  stages: any
  maxReviewers: number
}

type NewsletterApi = {
  create: (userData, command) => Promise<Newsletter>
}

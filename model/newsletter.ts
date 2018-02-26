/* newsletter {
  id
  owners: userId[]
  stages: []
  maxReviewers: 500
}
*/

type Newsletter = {
  newsletterId: string
  editors: string[]
  stages: any
  maxReviewers: number
}

type NewsletterApi = {
  create: (userData, command) => Promise<Newsletter>
}

import { NewsletterParams, Event } from "./types";

const makeEvent = (type: string) => (params: NewsletterParams): Event => ({
  id: params.newsletterId,
  payload: params,
  type
})

export const newsletterCreated = makeEvent('NEWSLETTER_CREATED')
export const newsletterMetadataUpdated = makeEvent('NEWSLETTER_METADATA_UPDATED')
export const newsletterDeleted = makeEvent('NEWSLETTER_DELETED')
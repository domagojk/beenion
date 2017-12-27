import { Newsletter, NewsletterEvent, newsletterId } from '../index'

export type NewsletterRepository = {
  getById: (id: newsletterId) => Promise<{
    newsletterState: Newsletter,
    save: (events: NewsletterEvent[], version?: number) => Promise<any>
  }>
}

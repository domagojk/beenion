import { Newsletter, NewsletterEvent, NewsletterId } from '../index'

export type NewsletterRepository = {
  getById: (id: NewsletterId) => Promise<{
    newsletterState: Newsletter,
    save: (events: NewsletterEvent[], version?: number) => Promise<any>
  }>
  create: (id: NewsletterId) => {
    save: (events: NewsletterEvent[]) => Promise<any>
  }
}

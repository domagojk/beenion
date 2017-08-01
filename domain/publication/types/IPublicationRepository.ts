import { PublicationEvents } from './PublicationEvents'

export interface IPublicationRepository {
  getEventsById (projectId: string): Promise<PublicationEvents>
  save (projectId: string, events: PublicationEvents): Promise<void>
}

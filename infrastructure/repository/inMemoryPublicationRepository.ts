import { IPublicationRepository } from 'domain/publication/types/IPublicationRepository'

class PublicationRepository implements IPublicationRepository {
  private streams = {}

  async getEventsById (id) {
    return this.streams[id] || []
  }

  async save (id, events) {
    if (!this.streams[id]) {
      this.streams[id] = []
    }

    this.streams[id] = [...this.streams[id], ...events]
  }

}

export default PublicationRepository

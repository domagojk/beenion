import { IProjectRepository } from 'domain/project/types/IProjectRepository'

class ProjectRepository implements IProjectRepository {
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

export default ProjectRepository

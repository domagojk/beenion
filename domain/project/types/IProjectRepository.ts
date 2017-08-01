import { ProjectEvents } from './ProjectEvents'

export interface IProjectRepository {
  getEventsById (projectId: string): Promise<ProjectEvents>
  save (projectId: string, events: ProjectEvents): Promise<void>
}

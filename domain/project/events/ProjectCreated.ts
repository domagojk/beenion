import { IProjectEvent } from '../types/IProjectEvent'
import { PublicationConditions } from 'domain/publication/types/PublicationConditions'
import { PROJECT_CREATED } from 'domain/constants'

export default class ProjectCreated implements IProjectEvent {
  public type = PROJECT_CREATED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public publicaitionId: string,
    public publicationConditions: PublicationConditions,
    public userId: number,
    public name: string,
    public description: string,
    public link: string
  ) {}
}

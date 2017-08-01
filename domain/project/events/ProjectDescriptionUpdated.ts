import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_DESCRIPTION_UPDATED } from 'domain/constants'

export default class ProjectDescriptionUpdated implements IProjectEvent {
  public type = PROJECT_DESCRIPTION_UPDATED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public description: string
  ) {}
}

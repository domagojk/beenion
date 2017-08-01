import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_NAME_UPDATED } from 'domain/constants'

export default class ProjectNameUpdated implements IProjectEvent {
  public type = PROJECT_NAME_UPDATED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public name: string
  ) {}
}

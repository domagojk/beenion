import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_DELETED } from 'domain/constants'

export default class ProjectDeleted implements IProjectEvent {
  public type = PROJECT_DELETED
  public timestamp = Date.now()

  constructor (
    public projectId: string
  ) {}
}

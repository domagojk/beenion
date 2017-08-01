import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_PROMOTED } from 'domain/constants'

export default class ProjectPromoted implements IProjectEvent {
  public type = PROJECT_PROMOTED
  public timestamp = Date.now()

  constructor (
    public projectId: string
  ) {}
}

import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_RESUBMITTED } from 'domain/constants'

export default class ProjectResubmitted implements IProjectEvent {
  public type = PROJECT_RESUBMITTED
  public timestamp = Date.now()

  constructor (
    public projectId: string
  ) {}
}

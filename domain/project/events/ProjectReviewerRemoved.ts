import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_REVIEWER_REMOVED } from 'domain/constants'

export default class ProjectReviewerRemoved implements IProjectEvent {
  public type = PROJECT_REVIEWER_REMOVED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public reviewerId: number
  ) {}
}

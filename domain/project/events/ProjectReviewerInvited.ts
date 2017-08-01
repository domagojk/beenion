import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_REVIEWER_INVITED } from 'domain/constants'

export default class ProjectReviewerInvited implements IProjectEvent {
  public type = PROJECT_REVIEWER_INVITED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public reviewerId: number
  ) {}
}

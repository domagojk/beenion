import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_REVIEWER_INVITATION_REJECTED } from 'domain/constants'

export default class ProjectReviewerInvitationRejected implements IProjectEvent {
  public type = PROJECT_REVIEWER_INVITATION_REJECTED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public reviewerId: number
  ) {}
}

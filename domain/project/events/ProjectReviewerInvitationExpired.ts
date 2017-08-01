import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_REVIEWER_INVITATION_EXPIRED } from 'domain/constants'

export default class ProjectReviewerInvitationExpired implements IProjectEvent {
  public type = PROJECT_REVIEWER_INVITATION_EXPIRED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public reviewerId: number
  ) {}
}

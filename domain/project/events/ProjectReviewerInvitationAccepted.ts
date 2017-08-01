import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_REVIEWER_INVITATION_ACCEPTED } from 'domain/constants'

export default class ProjectReviewerInvitationAccepted implements IProjectEvent {
  public type = PROJECT_REVIEWER_INVITATION_ACCEPTED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public reviewerId: number
  ) {}
}

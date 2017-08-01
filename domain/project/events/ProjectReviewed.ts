import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_REVIEWED } from 'domain/constants'

export default class ProjectReviewed implements IProjectEvent {
  public type = PROJECT_REVIEWED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public reviewerId: number,
    public review: string
  ) {}
}

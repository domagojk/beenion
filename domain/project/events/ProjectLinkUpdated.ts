import { IProjectEvent } from '../types/IProjectEvent'
import { PROJECT_LINK_UPDATED } from 'domain/constants'

export default class ProjectLinkUpdated implements IProjectEvent {
  public type = PROJECT_LINK_UPDATED
  public timestamp = Date.now()

  constructor (
    public projectId: string,
    public link: string
  ) {}
}

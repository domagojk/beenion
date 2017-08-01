import { IPublicationEvent } from '../types/IPublicationEvent'
import { PublicationConditions } from '../types/PublicationConditions'
import { PUBLICATION_CONDITIONS_UPDATED } from 'domain/constants'

export default class PublicationConditonsUpdated implements IPublicationEvent {
  public type = PUBLICATION_CONDITIONS_UPDATED
  public timestamp = Date.now()

  constructor (
    public publicationId: string,
    public conditions: PublicationConditions
  ) {}
}

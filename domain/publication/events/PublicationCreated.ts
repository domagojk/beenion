import { IPublicationEvent } from '../types/IPublicationEvent'
import { PublicationConditions } from '../types/PublicationConditions'
import { PUBLICATION_CREATED } from 'domain/constants'

export default class PublicationCreated implements IPublicationEvent {
  public type = PUBLICATION_CREATED
  public timestamp = Date.now()

  constructor (
    public publicationId: string,
    public owner: number,
    public name: string,
    public description: string,
    public conditions: PublicationConditions
  ) {}
}

import createPublication from 'domain/publication/create'
import { IPublicationRepository } from 'domain/publication/types/IPublicationRepository'
import { PublicationConditions } from 'domain/publication/types/PublicationConditions'

export default (publicationRepository: IPublicationRepository) =>
  async function (
    publicationId: string,
    userId: number,
    name: string,
    description: string,
    conditions: PublicationConditions
  ) {
    if (typeof publicationId !== 'string') {
      throw new Error('invalid publicationId')
    }
    if (typeof userId !== 'number') {
      throw new Error('invalid userId')
    }
    if (typeof name !== 'string') {
      throw new Error('invalid publication name')
    }
    if (typeof description !== 'string') {
      throw new Error('invalid publication description')
    }

    const publicationHistory = await publicationRepository.getEventsById(
      publicationId
    )

    if (publicationHistory.length !== 0) {
      throw new Error(`Publication ${publicationId} already exists`)
    }

    const events = createPublication(
      publicationId,
      userId,
      name,
      description,
      conditions
    )

    return publicationRepository.save(publicationId, events)
  }

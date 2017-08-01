import updateConditions from 'domain/publication/updateConditions'
import { IPublicationRepository } from 'domain/publication/types/IPublicationRepository'
import { PublicationConditions } from 'domain/publication/types/PublicationConditions'

export default (publicationRepository: IPublicationRepository) =>
  async function (
    publicationId: string,
    conditions: PublicationConditions
  ) {
    if (typeof publicationId !== 'string') {
      throw new Error('invalid publicationId')
    }
    if (!Array.isArray(conditions) || !conditions.length) {
      throw new Error('invalid publication conditions')
    }

    const publicationHistory = await publicationRepository.getEventsById(
      publicationId
    )

    const events = updateConditions(publicationHistory, publicationId, conditions)

    return publicationRepository.save(publicationId, events)
  }

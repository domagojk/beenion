import createProject from 'domain/project/create'
import { IProjectRepository } from 'domain/project/types/IProjectRepository'
import { IPublicationRepository } from 'domain/publication/types/IPublicationRepository'

export default (
  publicationRepository: IPublicationRepository,
  projectRepository: IProjectRepository
) =>
  async function (
    projectId: string,
    publicationId: string,
    userId: number,
    name: string,
    description: string,
    link: string
  ) {
    if (typeof projectId !== 'string') {
      throw new Error('invalid projectId')
    }
    if (typeof publicationId !== 'string') {
      throw new Error('invalid publicationId')
    }
    if (typeof userId !== 'number') {
      throw new Error('invalid userId')
    }
    if (typeof name !== 'string') {
      throw new Error('invalid project name')
    }
    if (typeof description !== 'string') {
      throw new Error('invalid project description')
    }
    if (typeof link !== 'string') {
      throw new Error('invalid project link')
    }

    const publicationHistory = await publicationRepository.getEventsById(publicationId)

    const events = createProject(
      publicationHistory,
      projectId,
      publicationId,
      userId,
      name,
      description,
      link
    )

    return await projectRepository.save(projectId, events)
  }

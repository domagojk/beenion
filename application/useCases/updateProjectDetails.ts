import { IProjectRepository } from 'domain/project/types/IProjectRepository'
import updateProjectName from 'domain/project/updateName'
import updateProjectDescription from 'domain/project/updateDescription'
import updateProjectLink from 'domain/project/updateLink'

export default (projectRepository: IProjectRepository) =>
  async function (
    projectId: string,
    name: string,
    description: string,
    link: string
  ) {
    if (typeof projectId !== 'string') {
      throw new Error('invalid projectId')
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

    const projectHistory = await projectRepository.getEventsById(projectId)

    const events = [
      ...updateProjectName(projectHistory, name),
      ...updateProjectDescription(projectHistory, description),
      ...updateProjectLink(projectHistory, link)
    ]

    await projectRepository.save(projectId, events)
  }

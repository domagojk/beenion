import Project from 'domain/project/Project'
import { IProjectRepository } from 'domain/project/IProjectRepository'

const createProject = (repository: IProjectRepository) =>
  function(
    userId: number,
    projectId: string,
    name: string,
    description: string,
    link: string
  ) {
    // run type checks
    if (typeof projectId !== 'string') {
      throw new Error('invalid projectId')
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

    // handling domain objects and saving changes
    const project = new Project(projectId, userId, name, description, link)
    repository.save(project)
  }

export default createProject

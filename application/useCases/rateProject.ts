import Project from 'domain/project/Project'
import { IProjectRepository } from 'domain/project/IProjectRepository'

const rateProject = (repository: IProjectRepository) =>
  function(projectId: string, rating: number) {
    // run type checks
    if (typeof projectId !== 'string') {
      throw new Error('invalid projectId')
    }
    if (typeof rating !== 'number') {
      throw new Error('invalid rating')
    }
    // handling domain objects and saving changes
    const project = repository.getById(projectId)
    project.rateProject(rating)
    project.promoteProject()
    project.somethingElse()
    repository.save(project)
  }

export default rateProject

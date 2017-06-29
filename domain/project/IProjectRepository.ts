import { Iproject } from './Project'

export interface IProjectRepository {
  save(Project: Iproject)
  getById(id): Iproject
}
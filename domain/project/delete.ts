import { ProjectEvents } from './types/ProjectEvents'
import ProjectDeleted from './events/ProjectDeleted'
import getProjectState from './state/project'

function deleteProject (history: ProjectEvents) {
  const project = getProjectState(history)

  if (!project.id) {
    throw new Error(`Project does not exists.`)
  }

  return [
    new ProjectDeleted(project.id)
  ]
}

export default deleteProject

import { ProjectEvents } from './types/ProjectEvents'
import ProjectNameUpdated from './events/ProjectNameUpdated'
import getProjectState from './state/project'

function updateName (history: ProjectEvents, name: string) {
  const project = getProjectState(history)

  if (!project.id) {
    throw new Error(`Project does not exists.`)
  }

  return [
    new ProjectNameUpdated(project.id, name)
  ]
}

export default updateName

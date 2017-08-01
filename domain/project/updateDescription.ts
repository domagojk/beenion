import { ProjectEvents } from './types/ProjectEvents'
import ProjectDescriptionUpdated from './events/ProjectDescriptionUpdated'
import getProjectState from './state/project'

function updateDescription (history: ProjectEvents, description: string) {
  const project = getProjectState(history)

  if (!project.id) {
    throw new Error(`Project does not exists.`)
  }

  return [
    new ProjectDescriptionUpdated(project.id, description)
  ]
}

export default updateDescription

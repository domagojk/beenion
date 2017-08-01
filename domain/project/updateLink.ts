import { ProjectEvents } from './types/ProjectEvents'
import ProjectLinkUpdated from './events/ProjectLinkUpdated'
import getProjectState from './state/project'

function updateLink (history: ProjectEvents, link: string) {
  const project = getProjectState(history)

  if (!project.id) {
    throw new Error(`Project does not exists.`)
  }

  return [
    new ProjectLinkUpdated(project.id, link)
  ]
}

export default updateLink

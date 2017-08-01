import { ProjectEvents } from './types/ProjectEvents'
import ProjectPromoted from './events/ProjectPromoted'
import getProjectState from './state/project'

function promote (history: ProjectEvents) {
  const project = getProjectState(history)
  const currentStageConditions = project.publicationConditions[project.currentStage]

  if (project.accepted < currentStageConditions.threshold) {
    throw new Error(`Project ${project.id} did not met publication conditions to be published.`)
  }

  return [
    new ProjectPromoted(project.id)
  ]
}

export default promote

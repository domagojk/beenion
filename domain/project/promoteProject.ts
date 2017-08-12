import { PromoteProject, ProjectPromoted } from 'domain/UL'
import calcProjectState from './state/calcProjectState'

function promoteProject (c: PromoteProject): [ProjectPromoted] {
  const project = calcProjectState(c.projectHistory)
  const currentConditions = project.publicationConditions[project.currentStage]

  if (project.accepted < currentConditions.threshold) {
    throw new Error(
      `Project ${project.id} did not met publication conditions to be promoted.`
    )
  }

  return [
    {
      type: 'ProjectPromoted',
      projectId: c.projectId,
      timestamp: c.timestamp
    }
  ]
}

export default promoteProject

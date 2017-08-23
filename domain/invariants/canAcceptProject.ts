import { Project } from 'domain/UL/types'

const hasAccepted = res => res.evaluation === 'accept'

export default (project: Project) =>
  project.inFinalStage &&
  project.evaluations.filter(hasAccepted).length >= project.rules.threshold

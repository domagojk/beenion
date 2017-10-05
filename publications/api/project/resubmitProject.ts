import { ProjectEvent } from 'domain/types/events'
import { canResubmitProject } from 'domain/businessRules'
import { PROJECT_RESUBMIT_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import reduceToProject from 'domain/reduceToProject'
import {
  createUserHistory,
  createPublicationHistory,
  createProjectHistory,
  createTimestamp
} from 'domain/typeFactories'

function resubmitProject (command: {
  userHistory: object[]
  publicationHistory: object[]
  projectHistory: object[]
  timestamp: number
}): ProjectEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const projectHistory = createProjectHistory(command.projectHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const project = reduceToProject(projectHistory)
  const publication = reduceToPublication(publicationHistory)
  const user = reduceToUser(userHistory)

  if (!canResubmitProject(user, project, publication)) {
    throw new Error(PROJECT_RESUBMIT_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectResubmitted',
      projectId: project.projectId,
      timestamp
    }
  ]
}

export default resubmitProject

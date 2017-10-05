import { ProjectEvent } from 'domain/types/events'
import { canUpdateProject } from 'domain/businessRules'
import { PROJECT_UPDATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import reduceToProject from 'domain/reduceToProject'
import {
  createUserHistory,
  createPublicationHistory,
  createProjectHistory,
  createTitle,
  createTimestamp
} from 'domain/typeFactories'

function updateProjectTitle (command: {
  userHistory: object[]
  publicationHistory: object[]
  projectHistory: object[]
  title: string,
  timestamp: number
}): ProjectEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const projectHistory = createProjectHistory(command.projectHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const title = createTitle(command.title)
  const timestamp = createTimestamp(command.timestamp)

  const project = reduceToProject(projectHistory)
  const publication = reduceToPublication(publicationHistory)
  const user = reduceToUser(userHistory)

  if (!canUpdateProject(user, project, publication)) {
    throw new Error(PROJECT_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectTitleDefined',
      projectId: project.projectId,
      title,
      timestamp
    }
  ]
}

export default updateProjectTitle

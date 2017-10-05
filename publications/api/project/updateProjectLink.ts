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
  createURL,
  createTimestamp
} from 'domain/typeFactories'

function updateProjectLink (command: {
  userHistory: object[]
  publicationHistory: object[]
  projectHistory: object[]
  link: string,
  timestamp: number
}): ProjectEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const projectHistory = createProjectHistory(command.projectHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const link = createURL(command.link)
  const timestamp = createTimestamp(command.timestamp)

  const project = reduceToProject(projectHistory)
  const publication = reduceToPublication(publicationHistory)
  const user = reduceToUser(userHistory)

  if (!canUpdateProject(user, project, publication)) {
    throw new Error(PROJECT_UPDATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectLinkDefined',
      projectId: project.projectId,
      link,
      timestamp
    }
  ]
}

export default updateProjectLink

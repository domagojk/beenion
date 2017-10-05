import { ProjectEvent } from 'domain/types/events'
import { canBanProject } from 'domain/businessRules'
import { PROJECT_UNBAN_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import reduceToProject from 'domain/reduceToProject'
import {
  createUserHistory,
  createPublicationHistory,
  createProjectHistory,
  createTimestamp
} from 'domain/typeFactories'

function unbanProject (command: {
  userHistory: object[]
  publicationHistory: object[]
  projectHistory: object[]
  timestamp: number
}): ProjectEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const projectHistory = createProjectHistory(command.projectHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const timestamp = createTimestamp(command.timestamp)

  const user = reduceToUser(userHistory)
  const project = reduceToProject(projectHistory)
  const publication = reduceToPublication(publicationHistory)

  if (!canBanProject(user, project, publication)) {
    throw new Error(PROJECT_UNBAN_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectUnbanned',
      projectId: project.projectId,
      userId: user.userId,
      timestamp
    }
  ]
}

export default unbanProject

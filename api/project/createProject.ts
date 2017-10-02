import { ProjectEvent } from 'domain/types/events'
import { canCreateProject } from 'domain/businessRules'
import { PROJECT_CREATE_NOT_ALLOWED } from 'domain/errorCodes'
import reduceToUser from 'domain/reduceToUser'
import reduceToPublication from 'domain/reduceToPublication'
import {
  createUserHistory,
  createPublicationHistory,
  createProjectId,
  createTitle,
  createDescription,
  createURL,
  createTimestamp
} from 'domain/typeFactories'

function createProject (command: {
  userHistory: object[]
  publicationHistory: object[]
  projectId: string
  title: string
  description: string
  link: string
  timestamp: number
}): ProjectEvent[] {

  const userHistory = createUserHistory(command.userHistory)
  const publicationHistory = createPublicationHistory(command.publicationHistory)
  const projectId = createProjectId(command.projectId)
  const title = createTitle(command.title)
  const description = createDescription(command.description)
  const link = createURL(command.link)
  const timestamp = createTimestamp(command.timestamp)

  const publication = reduceToPublication(publicationHistory)
  const user = reduceToUser(userHistory)

  if (!canCreateProject(user, publication)) {
    throw new Error(PROJECT_CREATE_NOT_ALLOWED)
  }

  return [
    {
      type: 'ProjectCreated',
      ownerId: user.userId,
      publicationId: publication.publicationId,
      projectId,
      timestamp
    },
    {
      type: 'ProjectTitleDefined',
      projectId,
      title,
      timestamp
    },
    {
      type: 'ProjectDescriptionDefined',
      projectId,
      description,
      timestamp
    },
    {
      type: 'ProjectLinkDefined',
      projectId,
      link,
      timestamp
    },
    {
      type: 'ProjectStageRulesDefined',
      projectId,
      stageRules: publication.stageRules,
      timestamp
    }
  ]
}

export default createProject

import {
  CreateProject,
  UpdateProjectLink,
  UpdateProjectTitle,
  UpdateProjectDescription,
  ProjectEvent
} from 'domain/UL'
import * as Types from './validation/types'
import validateCommand from './validation/validateCommand'
import createProject from 'domain/project/createProject'
import updateProjectLink from 'domain/project/updateProjectLink'
import updateProjectTitle from 'domain/project/updateProjectTitle'
import updateProjectDescription from 'domain/project/updateProjectDescription'

// todo:
//  check roles for each command
//  roles can be defined in UL.ts
//  type Role = 'ProjectOwner' | 'PublicationEditor' | 'BeenionAdmin'

export function create (c: CreateProject): ProjectEvent[] {
  validateCommand(c, {
    projectId: Types.UUID,
    publicationId: Types.UUID,
    link: Types.URL,
    publicationHistory: [Types.PublicationEvent],
    owner: Types.num,
    describtion: Types.Description,
    title: Types.Title,
    timestamp: Types.Timestamp
  })
  return createProject(c)
}

export function updateTitle (c: UpdateProjectTitle): ProjectEvent[] {
  validateCommand(c, {
    id: Types.UUID,
    title: Types.Title,
    timestamp: Types.Timestamp
  })
  return updateProjectTitle(c)
}

export function updateDescription (c: UpdateProjectDescription): ProjectEvent[] {
  validateCommand(c, {
    id: Types.UUID,
    describtion: Types.Description,
    timestamp: Types.Timestamp
  })
  return updateProjectDescription(c)
}

export function updateLink (c: UpdateProjectLink): ProjectEvent[] {
  validateCommand(c, {
    id: Types.UUID,
    link: URL,
    timestamp: Types.Timestamp
  })
  return updateProjectLink(c)
}

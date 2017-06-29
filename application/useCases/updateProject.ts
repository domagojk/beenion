import { repository } from 'config'
import { UpdateProject } from 'domain/project/commands'
import projectReducer from 'domain/project/reducers'
import updateProject from 'domain/project/commandHandlers/update'

export default function (command: UpdateProject) {
  if (!command.projectId) {
    throw new Error('missing projectId')
  }
  if (!command.userId) {
    throw new Error('missing userId')
  }
  if (!command.name) {
    throw new Error('missing project name')
  }
  if (!command.description) {
    throw new Error('missing project description')
  }
  if (!command.link) {
    throw new Error('missing project link')
  }

  return repository.loadEvents(command.projectId)
    .then(events => events.reduce(projectReducer))
    .then(state => updateProject(state, command))
    .then(events => repository.save(command.projectId, events, events.length))
}

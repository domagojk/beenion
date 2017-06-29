import { repository } from 'config'
import { PromoteProject } from 'domain/project/commands'
import projectReducer from 'domain/project/reducers'
import promoteProject from 'domain/project/commandHandlers/promote'

export default function (command: PromoteProject) {
  if (!command.projectId) {
    throw new Error('missing projectId')
  }
  if (!command.userId) {
    throw new Error('missing userId')
  }

  return repository.loadEvents(command.projectId)
    .then(events => events.reduce(projectReducer))
    .then(state => promoteProject(state, command))
    .then(events => repository.save(command.projectId, events, events.length))
}

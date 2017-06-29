import { State } from './ProjectEventHandlers'
import { ProjectCreated, ProjectDetailsUpdated } from './events'

export default {
  new: (state: State) => (id, userId, name, description, link) =>
    new ProjectCreated(id, userId, name, description, link),

  updateDetails: (state: State) => (name, description, link) =>
    new ProjectDetailsUpdated(state.id, state.userId, name, description, link)
}

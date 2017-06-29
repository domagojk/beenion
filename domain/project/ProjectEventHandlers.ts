import { ProjectCreated } from './events'

export type State = {
  id: string,
  userId: number,
  name: string,
  description: string,
  votes: number,
  rating: number
}

export default {
  projectCreated: (state: State) => (event: ProjectCreated): State => ({
    id: event.projectId,
    userId: event.userId,
    name: event.name,
    description: event.description,
    votes: 0,
    rating: 0
  }),

  projectRated: (state: State) => (event): State => ({
    ...state,
    votes: state.votes + 1,
    rating: (state.rating + event.rating) / (state.votes + 1)
  })
}


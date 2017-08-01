import { calcState } from 'domain/utils'
import { PublicationConditions } from 'domain/publication/types/PublicationConditions'
import ProjectCreated from '../events/ProjectCreated'
import ProjectReviewed from '../events/ProjectReviewed'
import { PROJECT_CREATED, PROJECT_REVIEWED } from 'domain/constants'

interface State {
  id: string
  publicationConditions: PublicationConditions
  assignedReviewers: Array<number>
  currentStage: number
  userId: number
  name: string
  description: string
  accepted: number
  rejected: number
}

export const eventHandlers = {
  [PROJECT_CREATED]: (state: State, event: ProjectCreated): State => ({
    id: event.projectId,
    userId: event.userId,
    name: event.name,
    description: event.description,
    publicationConditions: event.publicationConditions,
    assignedReviewers: [],
    currentStage: 0,
    accepted: 0,
    rejected: 0
  }),

  [PROJECT_REVIEWED]: (state: State, event: ProjectReviewed): State => ({
    ...state,
    accepted: (event.review === 'accept') ? state.accepted + 1 : state.accepted,
    rejected: (event.review === 'reject') ? state.rejected + 1 : state.rejected
  })
}

export default history => calcState(eventHandlers, history) as State

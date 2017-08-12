import { ProjectEvent, PublicationCondition, User, UUID } from 'domain/UL'

type State = {
  id: UUID
  owner: User
  title: string
  description: string
  publicationConditions: PublicationCondition[]
  assignedReviewers: Array<number>
  currentStage: number
  accepted: number
  rejected: number
}

const initialState = {
  id: null,
  owner: null,
  title: null,
  description: null,
  publicationConditions: null,
  assignedReviewers: [],
  currentStage: 0,
  accepted: 0,
  rejected: 0
}

function reducer (state: State, e: ProjectEvent): State {
  switch (e.type) {
    case 'ProjectCreated':
      return {
        ...state,
        id: e.projectId,
        owner: e.owner,
        title: e.title,
        description: e.description,
        publicationConditions: e.publicationConditions
      }
    case 'ProjectReviewed':
      return {
        ...state,
        accepted: e.review === 'accept' ? state.accepted + 1 : state.accepted,
        rejected: e.review === 'reject' ? state.rejected + 1 : state.rejected
      }
    default:
      return state
  }
}

export default (history: ProjectEvent[]): State =>
  history.reduce(reducer, initialState)

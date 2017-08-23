import { Project, ProjectEvent } from 'domain/UL/types'

function reducer (state: Project, e: ProjectEvent): Project {
  switch (e.type) {
    case 'ProjectCreated':
      return {
        ...state,
        projectId: e.projectId,
        ownerId: e.ownerId,
        stages: e.stages
      }
    case 'ProjectReviewed':
      return {
        ...state,
        accepted: e.evaluation === 'accept' ? state.accepted + 1 : state.accepted,
        completedReviews: [...state.completedReviews, e.reviewerId]
      }
    default:
      return state
  }
}

export default (
  history: ProjectEvent[],
  initialState: Project = {
    projectId: null,
    ownerId: null,
    stages: [],
    currentStage: null,
    inFinalStage: null,
    rules: null,
    reviewers: [],
    evaluations: []
  }
): Project => history.reduce(reducer, initialState)

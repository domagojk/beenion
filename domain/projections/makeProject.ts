import { ProjectEvent } from 'domain/types/events'
import { Project } from 'domain/types/model'

const makeProject =
  (history: ProjectEvent[], initialState?: Project): Project =>
    history.reduce(projectReducer, initialState)

const projectReducer = (project: Project, e: ProjectEvent): Project => {
  switch (e.type) {
    case 'ProjectCreated':
      return {
        projectId: e.projectId,
        ownerId: e.ownerId,
        stages: e.stages,
        currentStage: 0,
        stageRules: null,
        reviewers: [],
        evaluations: [],
        acceptedReviews: 0,
        inFinalStage: false,
        reviewProcessCompleted: false,
        banned: false
      }
    case 'ProjectReviewerInvited':
      return {
        ...project,
        reviewers: [...project.reviewers, e.reviewerId]
      }
    case 'ProjectReviewerRemoved':
      return {
        ...project,
        reviewers: project.reviewers.filter(id => id !== e.reviewerId)
      }
    case 'ProjectReviewed':
      const hasAccepted = review => review.evaluation === 'accept'

      return {
        ...project,
        evaluations: [
          ...project.evaluations,
          {
            evaluation: e.evaluation,
            reviewerId: e.reviewerId
          }
        ],
        acceptedReviews: project.evaluations.filter(hasAccepted).length
      }
    case 'ProjectPromoted':
      return {
        ...project,
        inFinalStage: project.currentStage === project.stages.length - 1,
        currentStage: project.currentStage + 1
      }
    case 'ProjectResubmitted':
      return {
        ...project,
        currentStage: 0,
        inFinalStage: false,
        reviewProcessCompleted: false,
        reviewers: [],
        evaluations: [],
        acceptedReviews: 0
      }
    case 'ProjectAccepted':
    case 'ProjectRejected':
      return {
        ...project,
        reviewProcessCompleted: true
      }
    case 'ProjectBanned':
      return {
        ...project,
        banned: true
      }
    case 'ProjectUnbanned':
      return {
        ...project,
        banned: false
      }
    default:
      return project
  }
}

export default makeProject

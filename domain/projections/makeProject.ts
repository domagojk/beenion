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
        stageRules: e.stageRules,
        currentStage: 0,
        reviewers: [],
        evaluations: [],
        reviewProcessCompleted: false,
        approved: false,
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
        evaluations: project.evaluations.filter(ev => ev.reviewerId !== e.reviewerId),
        reviewers: project.reviewers.filter(id => id !== e.reviewerId)
      }
    case 'ProjectReviewed':
      return {
        ...project,
        evaluations: [
          ...project.evaluations,
          {
            evaluation: e.evaluation,
            reviewerId: e.reviewerId
          }
        ]
      }
    case 'ProjectPromoted':
      return {
        ...project,
        currentStage: project.currentStage + 1
      }
    case 'ProjectRejected':
      return {
        ...project,
        reviewProcessCompleted: true,
        approved: false,
        stageRules: null,
        currentStage: null,
        reviewers: null,
        evaluations: null
      }
    case 'ProjectApproved':
      return {
        ...project,
        reviewProcessCompleted: true,
        approved: true,
        stageRules: null,
        currentStage: null,
        reviewers: null,
        evaluations: null
      }
    case 'ProjectResubmitted':
      return {
        ...project,
        stageRules: e.stageRules,
        currentStage: 0,
        reviewProcessCompleted: false,
        reviewers: [],
        evaluations: []
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

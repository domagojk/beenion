import { ProjectEvent } from './types/events'
import { Project, Stage } from './types/model'

const reduceToProject =
  (history: ProjectEvent[], initialState?: Project): Project =>
    history.reduce(projectReducer, initialState)

const projectReducer = (project: Project, e: ProjectEvent): Project => {
  const defaultValues = {
    stageRules: null,
    lastStage: null,
    currentStage: 0,
    reviewers: [],
    evaluations: [],
    reviewProcessCompleted: false,
    approved: false,
    banned: false
  }

  switch (e.type) {
    case 'ProjectCreated':
      return {
        ...defaultValues,
        projectId: e.projectId,
        ownerId: e.ownerId
      }
    case 'ProjectStageRulesDefined':
      return {
        ...project,
        stageRules: e.stageRules,
        lastStage: e.stageRules.length - 1 as Stage
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
        ...defaultValues,
        reviewProcessCompleted: true,
        approved: false
      }
    case 'ProjectApproved':
      return {
        ...project,
        ...defaultValues,
        reviewProcessCompleted: true,
        approved: true
      }
    case 'ProjectResubmitted':
    case 'ProjectDeleted':
      return {
        ...project,
        ...defaultValues,
        reviewProcessCompleted: false
      }
    case 'ProjectBanned':
      return {
        ...project,
        ...defaultValues,
        banned: true
      }
    case 'ProjectUnbanned':
      return {
        ...project,
        ...defaultValues,
        banned: false
      }
    default:
      return project
  }
}

export default reduceToProject

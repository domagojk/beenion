import reduceToProject from './reduceToProject'
import { Project } from './types/model'
import { ProjectEvent } from './types/events'

describe('Project projection', () => {
  const projectCreatedEvent = {
    type: 'ProjectCreated',
    projectId: 'test-project-uuid',
    publicationId: 'test-publication-uuid',
    ownerId: 'test-user-uuid',
    timestamp: Date.now()
  } as ProjectEvent

  const genericProject = {
    projectId: 'test-project-uuid',
    ownerId: 'test-user-uuid',
    stageRules: null,
    lastStage: null,
    currentStage: 0,
    reviewers: [],
    evaluations: [],
    reviewProcessCompleted: false,
    approved: false,
    banned: false
  } as Project

  it('should create a project object', () => {
    const projectEvents = [projectCreatedEvent]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({...genericProject})
  })

  it('should add in reviewers list', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectReviewerInvited',
        projectId: 'test-project-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectReviewerInvited',
        projectId: 'test-project-uuid',
        reviewerId: 'test-reviewer2-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewers: ['test-reviewer1-uuid', 'test-reviewer2-uuid']
    })
  })

  it('should remove from reviewers list', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectReviewerInvited',
        projectId: 'test-project-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectReviewerInvited',
        projectId: 'test-project-uuid',
        reviewerId: 'test-reviewer2-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectReviewerRemoved',
        projectId: 'test-project-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewers: ['test-reviewer2-uuid']
    })
  })

  it('should add in evaluations list', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectReviewerInvited',
        projectId: 'test-project-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectReviewed',
        projectId: 'test-project-uuid',
        reviewerId: 'test-reviewer1-uuid',
        evaluation: 'approve',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewers: ['test-reviewer1-uuid'],
      evaluations: [
        {
          evaluation: 'approve',
          reviewerId: 'test-reviewer1-uuid'
        }
      ]
    })
  })

  it('should promote project to next stage', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectStageRulesDefined',
        projectId: 'test-project-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ProjectPromoted',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      stageRules: [
        { maxReviewers: 1, threshold: 2 },
        { maxReviewers: 3, threshold: 2 }
      ],
      lastStage: 1,
      currentStage: 1
    })
  })

  it('should reject project', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectStageRulesDefined',
        projectId: 'test-project-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ProjectRejected',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewProcessCompleted: true
    })
  })

  it('should approve project', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectStageRulesDefined',
        projectId: 'test-project-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ProjectApproved',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewProcessCompleted: true,
      approved: true
    })
  })

  it('should reset project data', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectStageRulesDefined',
        projectId: 'test-project-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ProjectResubmitted',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject
    })
  })

  it('should ban project', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectBanned',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      banned: true
    })
  })

  it('should unban project', () => {
    const projectEvents = [
      projectCreatedEvent,
      {
        type: 'ProjectBanned',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectUnbanned',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ] as ProjectEvent[]

    const project = reduceToProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      banned: false
    })
  })
})

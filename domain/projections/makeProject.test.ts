import makeProject from './makeProject'
import { Project } from 'domain/types/model'
import { ProjectEvent } from 'domain/types/events'

describe('Project projection', () => {
  const projectCreatedEvent: ProjectEvent = {
    type: 'ProjectCreated',
    projectId: 'test-project-uuid',
    publicationId: 'test-publication-uuid',
    stageRules: [
      {
        canReview: { beenionRank: 0 },
        maxReviewers: 3,
        threshold: 2
      }
    ],
    ownerId: 'test-user-uuid',
    title: 'test title',
    description: 'test description',
    link: 'http://testurl.com',
    timestamp: Date.now()
  }

  const genericProject: Project = {
    currentStage: 0,
    evaluations: [],
    ownerId: 'test-user-uuid',
    projectId: 'test-project-uuid',
    reviewers: [],
    stageRules: [
      {
        canReview: { beenionRank: 0 },
        maxReviewers: 3,
        threshold: 2
      }
    ],
    reviewProcessCompleted: false,
    banned: false
  }

  it('should create a project object', () => {
    const projectEvents = [projectCreatedEvent]

    const project = makeProject(projectEvents)

    expect(project).toEqual(genericProject)
  })

  it('should add in reviewers list', () => {
    const projectEvents: ProjectEvent[] = [
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
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewers: ['test-reviewer1-uuid', 'test-reviewer2-uuid']
    })
  })

  it('should remove from reviewers list', () => {
    const projectEvents: ProjectEvent[] = [
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
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewers: ['test-reviewer2-uuid']
    })
  })

  it('should add in evaluations list', () => {
    const projectEvents: ProjectEvent[] = [
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
        evaluation: 'accept',
        timestamp: Date.now()
      }
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      reviewers: ['test-reviewer1-uuid'],
      evaluations: [
        {
          evaluation: 'accept',
          reviewerId: 'test-reviewer1-uuid'
        }
      ]
    })
  })

  it('should promote project to next stage', () => {
    const projectEvents: ProjectEvent[] = [
      {
        ...projectCreatedEvent,
        stageRules: [
          {
            canReview: { beenionRank: 0 },
            maxReviewers: 1,
            threshold: 2
          },
          {
            canReview: { beenionRank: 0 },
            maxReviewers: 3,
            threshold: 2
          }
        ]
      },
      {
        type: 'ProjectPromoted',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      stageRules: [
        {
          canReview: { beenionRank: 0 },
          maxReviewers: 1,
          threshold: 2
        },
        {
          canReview: { beenionRank: 0 },
          maxReviewers: 3,
          threshold: 2
        }
      ],
      currentStage: 1
    })
  })

  it('should complete project review', () => {
    const projectEvents: ProjectEvent[] = [
      {
        ...projectCreatedEvent,
        stageRules: [
          {
            canReview: { beenionRank: 0 },
            maxReviewers: 1,
            threshold: 2
          },
          {
            canReview: { beenionRank: 0 },
            maxReviewers: 3,
            threshold: 2
          }
        ]
      },
      {
        type: 'ProjectPromoted',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ProjectPromoted',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      stageRules: null,
      reviewProcessCompleted: true,
      currentStage: null,
      reviewers: null,
      evaluations: null
    })
  })

  it('should reset project data with new rules', () => {
    const projectEvents: ProjectEvent[] = [
      {
        ...projectCreatedEvent,
        stageRules: [
          {
            canReview: { beenionRank: 0 },
            maxReviewers: 1,
            threshold: 2
          },
          {
            canReview: { beenionRank: 0 },
            maxReviewers: 3,
            threshold: 2
          }
        ]
      },
      {
        type: 'ProjectResubmitted',
        projectId: 'test-project-uuid',
        stageRules: [
          {
            canReview: { beenionRank: 100 },
            maxReviewers: 10,
            threshold: 5
          }
        ],
        timestamp: Date.now()
      }
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      stageRules: [
        {
          canReview: { beenionRank: 100 },
          maxReviewers: 10,
          threshold: 5
        }
      ],
      currentStage: 0,
      reviewProcessCompleted: false,
      reviewers: [],
      evaluations: []
    })
  })

  it('should ban project', () => {
    const projectEvents: ProjectEvent[] = [
      projectCreatedEvent,
      {
        type: 'ProjectBanned',
        userId: 'test-user-uuid',
        projectId: 'test-project-uuid',
        timestamp: Date.now()
      }
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      banned: true
    })
  })

  it('should unban project', () => {
    const projectEvents: ProjectEvent[] = [
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
    ]

    const project = makeProject(projectEvents)

    expect(project).toEqual({
      ...genericProject,
      banned: false
    })
  })
})

import makeProject from './makeProject'
import { ProjectEvent } from 'domain/types/events'

describe('makeProject projection', () => {
  it('should create a project object', () => {
    const projectEvents: ProjectEvent[] = [
      {
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
    ]

    const user = makeProject(projectEvents)

    expect(user).toEqual({
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
    })
  })

  it('should update project info', () => {
    const projectEvents: ProjectEvent[] = [
      {
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
    ]

    const user = makeProject(projectEvents)

    expect(user).toEqual({
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
    })
  })
})

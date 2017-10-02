import { Publication, Project, User, UserId } from './types/model'
import * as rules from './businessRules'

const genericPublication = {
  publicationId: 'test-publication-id',
  privilegeConditions: {
    canReviewInStage0: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canReviewInStage1: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canUpdatePublication: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canDeletePublication: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canCreateProject: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canDeleteProject: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canBanProject: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canUpdateProject: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canResubmitProject: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canVoteWithGold: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canVoteWithSilver: { beenionRank: { min: 5 }, publicationRank: { min: 5 } },
    canVoteWithBronze: { beenionRank: { min: 1 }, publicationRank: { min: 1 } }
  },
  rankCalcParams: {
    events: [
      { eventType: 'ReviewInvitationDeclined', factor: -1, group: 'invitation' },
      { eventType: 'ReviewInvitationExpired', factor: -1, group: 'invitation' },
      { eventType: 'ProjectUpvotedWithGold', factor: 10, group: 'projectGold' },
      { eventType: 'ProjectUpvotedWithSilver', factor: 5, group: 'projectSilver' },
      { eventType: 'ProjectUpvotedWithBronze', factor: 1, group: 'projectBronze' },
      { eventType: 'ProjectDownvotedWithGold', factor: -10, group: 'projectGold' },
      { eventType: 'ProjectDownvotedWithSilver', factor: -5, group: 'projectSilver' },
      { eventType: 'ProjectDownvotedWithBronze', factor: -1, group: 'projectBronze' },
      { eventType: 'ReviewUpvotedWithGold', factor: 10, group: 'reviewGold' },
      { eventType: 'ReviewUpvotedWithSilver', factor: 5, group: 'reviewSilver' },
      { eventType: 'ReviewUpvotedWithBronze', factor: 1, group: 'reviewBronze' },
      { eventType: 'ReviewDownvotedWithGold', factor: -10, group: 'reviewGold' },
      { eventType: 'ReviewDownvotedWithSilver', factor: -5, group: 'reviewSilver' },
      { eventType: 'ReviewDownvotedWithBronze', factor: -1, group: 'reviewBronze' }
    ],
    groups: [
      { group: 'invitation', rankRange: { min: -100, max: 100 } },
      { group: 'projectGold', rankRange: { min: -100, max: 100 } },
      { group: 'projectSilver', rankRange: { min: -100, max: 100 } },
      { group: 'projectBronze', rankRange: { min: -100, max: 100 } },
      { group: 'reviewGold', rankRange: { min: -100, max: 100 } },
      { group: 'reviewSilver', rankRange: { min: -100, max: 100 } },
      { group: 'reviewBronze', rankRange: { min: -100, max: 100 } }
    ]
  },
  stageRules: [
    { maxReviewers: 3, threshold: 2 },
    { maxReviewers: 3, threshold: 2 }
  ]
} as Publication

const genericProject = {
  projectId: 'test-project-uuid',
  ownerId: 'test-projectowner-uuid',
  stageRules: genericPublication.stageRules,
  currentStage: 0,
  lastStage: genericPublication.stageRules.length - 1,
  reviewers: ['test-user1-uuid', 'test-user2-uuid', 'test-user3-uuid'],
  evaluations: [
    { reviewerId: 'test-user1-uuid', evaluation: 'approve' },
    { reviewerId: 'test-user2-uuid', evaluation: 'approve' },
    { reviewerId: 'test-user3-uuid', evaluation: 'reject' }
  ],
  reviewProcessCompleted: false,
  approved: false,
  banned: false
} as Project

const genericUser = {
  userId: 'test-user-uuid',
  mergedUserIds: [],
  rankEvents: []
} as User

describe('publication permissions', () => {
  it('should permit creating publication', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        }
      ]
    } as User

    expect(rules.canCreatePublication(user)).toBe(true)
  })

  it('should not permit creating publication', () => {
    const user = {
      ...genericUser
    }

    expect(rules.canCreatePublication(user)).toBe(false)
  })

  it('should accept publication commands - large beenionRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        }
      ]
    } as User

    const publication = {
      ...genericPublication
    }

    expect(rules.canUpdatePublication(user, publication)).toBe(true)
    expect(rules.canDeletePublication(user, publication)).toBe(true)
  })

  it('should accept publication commands - large publicationRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'ProjectVotes',
          publicationId: genericPublication.publicationId,
          eventType: 'ProjectUpvotedWithGold'
        }
      ]
    } as User

    const publication = {
      ...genericPublication
    }

    expect(rules.canUpdatePublication(user, publication)).toBe(true)
    expect(rules.canDeletePublication(user, publication)).toBe(true)
  })
})

describe('project permissions', () => {
  it('should not accept command - not defined permission', () => {
    const user = {...genericUser}

    const publication = {
      ...genericPublication,
      privilegeConditions: {
        ...genericPublication.privilegeConditions,
        canBanProject: null
      }
    } as Publication

    const project = {...genericProject}

    expect(rules.canBanProject(user, project, publication)).toBe(false)
  })

  it('should accept project commands - in user access list', () => {
    const user = {
      ...genericUser,
      userId: 'special-user-uuid'
    } as User

    const publication = {
      ...genericPublication,
      privilegeConditions: {
        canCreateProject: { users: ['special-user-uuid'] },
        canDeleteProject: { users: ['special-user-uuid'] },
        canBanProject: { users: ['special-user-uuid'] },
        canUpdateProject: { users: ['special-user-uuid'] }
      }
    } as Publication

    const project = {
      ...genericProject
    }

    expect(rules.canCreateProject(user, publication)).toBe(true)
    expect(rules.canDeleteProject(user, project, publication)).toBe(true)
    expect(rules.canBanProject(user, project, publication)).toBe(true)
    expect(rules.canUpdateProject(user, project, publication)).toBe(true)
  })

  it('should accept project commands - large beenionRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        }
      ]
    } as User

    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject,
      reviewers: ['test-user1-uuid', 'test-user2-uuid']
    } as Project

    expect(rules.canCreateProject(user, publication)).toBe(true)
    expect(rules.canDeleteProject(user, project, publication)).toBe(true)
    expect(rules.canBanProject(user, project, publication)).toBe(true)
    expect(rules.canUpdateProject(user, project, publication)).toBe(true)
    expect(rules.canAddReviewer(user, project, publication)).toBe(true)
  })

  it('should accept project commands - large publicationRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'ReviewVotes',
          publicationId: 'test-publication-id',
          eventType: 'ReviewUpvotedWithGold'
        }
      ]
    } as User

    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject,
      reviewers: ['test-user1-uuid', 'test-user2-uuid']
    } as Project

    expect(rules.canCreateProject(user, publication)).toBe(true)
    expect(rules.canDeleteProject(user, project, publication)).toBe(true)
    expect(rules.canBanProject(user, project, publication)).toBe(true)
    expect(rules.canUpdateProject(user, project, publication)).toBe(true)
    expect(rules.canAddReviewer(user, project, publication)).toBe(true)
  })

  it('should not accept project commands - large beenionRank or publicationRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        },
        {
          category: 'ProjectVotes',
          publicationId: 'test-publication-id',
          eventType: 'ProjectUpvotedWithGold'
        }
      ]
    } as User

    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject
    }

    expect(rules.canResubmitProject(user, project, publication)).toBe(false)
    expect(rules.canReviewProject(user, project)).toBe(false)
  })

  it('should not accept project commands - insufficent beenionRank or publicationRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        },
        {
          category: 'ReviewVotes',
          publicationId: 'test-publication-id',
          eventType: 'ReviewUpvotedWithGold'
        }
      ]
    } as User

    const publication = {
      ...genericPublication,
      privilegeConditions: {
        ...genericPublication.privilegeConditions,
        canCreateProject: { beenionRank: { min: 500 } }
      }
    } as Publication

    expect(rules.canCreateProject(user, publication)).toBe(false)
  })

  it('should accept project commands - project owner', () => {
    const publication = {...genericPublication}

    const user = {
      ...genericUser,
      userId: 'test-user'
    } as User

    const project = {
      ...genericProject,
      ownerId: 'test-user'
    } as Project

    expect(rules.canDeleteProject(user, project, publication)).toBe(true)
    expect(rules.canUpdateProject(user, project, publication)).toBe(true)
  })

  it('should permit resubmiting project', () => {
    const publication = {...genericPublication}

    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'ReviewVotes',
          publicationId: 'test-publication-id',
          eventType: 'ReviewUpvotedWithGold'
        }
      ]
    } as User

    const project = {
      ...genericProject,
      reviewProcessCompleted: true,
      ownerId: user.userId
    } as Project

    expect(rules.canResubmitProject(user, project, publication)).toBe(true)
  })

  it('should permit removing reviewer', () => {
    const project = {
      ...genericProject
    }

    expect(rules.canRemoveReviewer(project.reviewers[0], project)).toBe(true)
  })

  it('should not permit removing reviewer', () => {
    const project = {...genericProject}
    const userId = 'unlisted-uuid' as UserId

    expect(rules.canRemoveReviewer(userId, project)).toBe(false)
  })

  it('should permit promoting project', () => {
    const project = {
      ...genericProject
    }

    expect(rules.canPromoteProject(project)).toBe(true)
  })

  it('should not permit promoting project', () => {
    const project = {
      ...genericProject,
      stageRules: [{
        ...genericProject.stageRules[0],
        threshold: 5
      }]
    }

    expect(rules.canPromoteProject(project)).toBe(false)
  })

  it('should permit approving project', () => {
    const project = {
      ...genericProject,
      currentStage: 1,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'approve'
        }
      ]
    } as Project

    expect(rules.canApproveProject(project)).toBe(true)
  })

  it('should not permit accepting project', () => {
    const project = {
      ...genericProject,
      currentStage: 1,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'reject'
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'reject'
        }
      ]
    } as Project

    expect(rules.canApproveProject(project)).toBe(false)
  })

  it('should permit rejecting project', () => {
    const project = {
      ...genericProject,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'reject'
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'reject'
        }
      ]
    } as Project

    expect(rules.canRejectProject(project)).toBe(true)
  })
})

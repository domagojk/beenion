import * as permissions from './permissions'
import { Project, User, Publication, Evaluation } from 'domain/types/model'

const genericUser: User = {
  userId: 'test-user-uuid',
  publicationAnalytics: {},
  beenionAnalytics: {
    UserUpvotedWithGold: 0,
    UserUpvotedWithSilver: 0,
    UserUpvotedWithBronze: 0,
    UserDownvotedWithGold: 0,
    UserDownvotedWithSilver: 0,
    UserDownvotedWithBronze: 0
  }
}

const genericPublication: Publication = {
  publicationId: 'test-publication-uuid',
  privileges: {
    canUpdatePublication: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canDeletePublication: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canCreateProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canDeleteProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canBanProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canUpdateProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canResubmitProject: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithGold: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithSilver: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithBronze: {
      userAccessList: ['special-user-uuid'],
      beenionRank: 10,
      publicationRank: 100
    }
  },
  rankConditions: {
    events: {
      ReviewInvitationAccepted: { factor: 1, group: 'invitation' },
      ReviewInvitationDeclined: { factor: -1, group: 'invitation' },
      ReviewInvitationExpired: { factor: -1, group: 'invitation' },
      ProjectUpvotedWithGold: { factor: 1, group: 'projectGold' },
      ProjectUpvotedWithSilver: { factor: 1, group: 'projectSilver' },
      ProjectUpvotedWithBronze: { factor: 1, group: 'projectBronze' },
      ProjectDownvotedWithGold: { factor: -1, group: 'projectGold' },
      ProjectDownvotedWithSilver: { factor: -1, group: 'projectSilver' },
      ProjectDownvotedWithBronze: { factor: -1, group: 'projectBronze' },
      ReviewUpvotedWithGold: { factor: 1, group: 'reviewGold' },
      ReviewUpvotedWithSilver: { factor: 1, group: 'reviewSilver' },
      ReviewUpvotedWithBronze: { factor: 1, group: 'reviewBronze' },
      ReviewDownvotedWithGold: { factor: -1, group: 'reviewGold' },
      ReviewDownvotedWithSilver: { factor: -1, group: 'reviewSilver' },
      ReviewDownvotedWithBronze: { factor: -1, group: 'reviewBronze' }
    },
    groups: {
      invitation: { min: -100, max: 100 },
      projectGold: { min: -100, max: 100 },
      projectSilver: { min: -100, max: 100 },
      projectBronze: { min: -100, max: 100 },
      reviewGold: { min: -100, max: 100 },
      reviewSilver: { min: -100, max: 100 },
      reviewBronze: { min: -100, max: 100 }
    }
  },
  projectStageRules: [
    {
      canReview: {
        beenionRank: 100,
        publicationRank: 100
      },
      maxReviewers: 3,
      threshold: 2
    },
    {
      canReview: {
        beenionRank: 100,
        publicationRank: 100
      },
      maxReviewers: 3,
      threshold: 3
    }
  ]
}

const genericProject: Project = {
  projectId: 'test-project-uuid',
  ownerId: 'test-projectowner-uuid',
  stageRules: genericPublication.projectStageRules,
  currentStage: 0,
  reviewers: ['test-user1-uuid', 'test-user2-uuid', 'test-user3-uuid'],
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
      evaluation: 'reject'
    }
  ],
  reviewProcessCompleted: false,
  approved: false,
  banned: false
}

describe('publication permissions', () => {
  it('should permit creating publication', () => {
    const user = {
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 100
      }
    }

    expect(permissions.canCreatePublication(user)).toBe(true)
  })

  it('should not permit creating publication', () => {
    const user = {
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserDownvotedWithGold: 1
      }
    }

    expect(permissions.canCreatePublication(user)).toBe(false)
  })

  it('should accept publication commands - large beenionRank', () => {
    const user = {
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 100
      }
    }
    const publication = {
      ...genericPublication
    }

    expect(permissions.canUpdatePublication(user, publication)).toBe(true)
    expect(permissions.canDeletePublication(user, publication)).toBe(true)
  })

  it('should accept publication commands - large publicationRank', () => {
    const user = {
      ...genericUser,
      publicationAnalytics: {
        'test-publication-uuid': {
          ReviewUpvotedWithGold: 1000
        }
      }
    }
    const publication = {
      ...genericPublication
    }

    expect(permissions.canUpdatePublication(user, publication)).toBe(true)
    expect(permissions.canDeletePublication(user, publication)).toBe(true)
  })
})

describe('project permissions', () => {
  it('should accept project commands - in user access list', () => {
    const user = {
      ...genericUser,
      userId: 'special-user-uuid'
    }
    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject
    }

    expect(permissions.canCreateProject(user, publication)).toBe(true)
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
    expect(permissions.canBanProject(user, project, publication)).toBe(true)
    expect(permissions.canUpdateProject(user, project, publication)).toBe(true)
  })

  it('should accept project commands - large beenionRank', () => {
    const user = {
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 100
      }
    }
    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject,
      reviewers: ['test-user1-uuid', 'test-user2-uuid']
    }

    expect(permissions.canCreateProject(user, publication)).toBe(true)
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
    expect(permissions.canBanProject(user, project, publication)).toBe(true)
    expect(permissions.canUpdateProject(user, project, publication)).toBe(true)
    expect(permissions.canInviteReviewer(user, project, publication)).toBe(true)
  })

  it('should accept project commands - large publicationRank', () => {
    const user = {
      ...genericUser,
      publicationAnalytics: {
        'test-publication-uuid': {
          ReviewUpvotedWithGold: 1000
        }
      }
    }
    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject,
      reviewers: ['test-user1-uuid', 'test-user2-uuid']
    }

    expect(permissions.canCreateProject(user, publication)).toBe(true)
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
    expect(permissions.canBanProject(user, project, publication)).toBe(true)
    expect(permissions.canUpdateProject(user, project, publication)).toBe(true)
    expect(permissions.canInviteReviewer(user, project, publication)).toBe(true)
  })

  it('should not accept project commands - large beenionRank or publicationRank', () => {
    const user = {
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 100
      },
      publicationAnalytics: {
        'test-publication-uuid': {
          ReviewUpvotedWithGold: 1000
        }
      }
    }
    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject
    }

    expect(permissions.canResubmitProject(user, project, publication)).toBe(false)
    expect(permissions.canReviewProject(user, project)).toBe(false)
  })

  it('should not accept project commands - insufficent beenionRank or publicationRank', () => {
    const user = {
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 1
      },
      publicationAnalytics: {
        'test-publication-uuid': {
          ReviewUpvotedWithGold: 1
        }
      }
    }
    const publication = {
      ...genericPublication,
      privileges: {
        ...genericPublication.privileges,
        canCreateProject: { beenionRank: 500 }
      }
    }

    expect(permissions.canCreateProject(user, publication)).toBe(false)
  })

  it('should accept project commands - project owner', () => {
    const user = {
      ...genericUser,
      userId: 'test-user'
    }
    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject,
      ownerId: 'test-user'
    }
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
    expect(permissions.canUpdateProject(user, project, publication)).toBe(true)
  })

  it('should permit resubmiting project', () => {
    const user = {
      ...genericUser,
      userId: 'test-user',
      publicationAnalytics: {
        'test-publication-uuid': {
          ReviewUpvotedWithGold: 1000
        }
      }
    }
    const publication = {
      ...genericPublication
    }
    const project = {
      ...genericProject,
      reviewProcessCompleted: true,
      ownerId: 'test-user'
    }
    expect(permissions.canResubmitProject(user, project, publication)).toBe(true)
  })

  it('should permit removing reviewer', () => {
    const project = {
      ...genericProject
    }

    expect(permissions.canRemoveReviewer(project.reviewers[0], project)).toBe(true)
  })

  it('should not permit removing reviewer', () => {
    const project = {
      ...genericProject
    }

    expect(permissions.canRemoveReviewer('unlisted-uuid', project)).toBe(false)
  })

  it('should permit promoting project', () => {
    const project = {
      ...genericProject
    }

    expect(permissions.canPromoteProject(project)).toBe(true)
  })

  it('should not permit promoting project', () => {
    const project = {
      ...genericProject,
      stageRules: [{
        ...genericProject.stageRules[0],
        threshold: 5
      }]
    }

    expect(permissions.canPromoteProject(project)).toBe(false)
  })

  it('should permit approving project', () => {
    const project = {
      ...genericProject,
      currentStage: 1,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve' as Evaluation
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'approve' as Evaluation
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'approve' as Evaluation
        }
      ]
    }
    expect(permissions.canApproveProject(project)).toBe(true)
  })

  it('should not permit accepting project', () => {
    const project = {
      ...genericProject,
      currentStage: 1,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve' as Evaluation
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'approve' as Evaluation
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'reject' as Evaluation
        }
      ]
    }
    expect(permissions.canApproveProject(project)).toBe(false)
  })

  it('should permit rejecting project', () => {
    const project = {
      ...genericProject,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve' as Evaluation
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'reject' as Evaluation
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'reject' as Evaluation
        }
      ]
    }
    expect(permissions.canRejectProject(project)).toBe(true)
  })
})

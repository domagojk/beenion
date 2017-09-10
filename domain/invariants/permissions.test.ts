import * as permissions from './permissions'
import { Project, User, Publication } from 'domain/types/model'

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
      beenionRank: 100,
      publicationRank: 100
    },
    canDeletePublication: {
      beenionRank: 100,
      publicationRank: 100
    },
    canCreateProject: {
      beenionRank: 100,
      publicationRank: 100
    },
    canDeleteProject: {
      beenionRank: 100,
      publicationRank: 100
    },
    canBanProject: {
      beenionRank: 100,
      publicationRank: 100
    },
    canUpdateProject: {
      beenionRank: 100,
      publicationRank: 100
    },
    canResubmitProject: {
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithGold: {
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithSilver: {
      beenionRank: 100,
      publicationRank: 100
    },
    canVoteWithBronze: {
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
        beenionRank: 0,
        publicationRank: 10
      },
      maxReviewers: 3,
      threshold: 2
    },
    {
      canReview: {
        beenionRank: 0,
        publicationRank: 10
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

describe('project invariants', () => {
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
      ...genericProject
    }

    expect(permissions.canCreateProject(user, publication)).toBe(true)
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
    expect(permissions.canBanProject(user, project, publication)).toBe(true)
    expect(permissions.canUpdateProject(user, project, publication)).toBe(true)
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
      ...genericProject
    }

    expect(permissions.canCreateProject(user, publication)).toBe(true)
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
    expect(permissions.canBanProject(user, project, publication)).toBe(true)
    expect(permissions.canUpdateProject(user, project, publication)).toBe(true)
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

    expect(permissions.canInviteReviewer(user, project, publication)).toBe(false)
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
})

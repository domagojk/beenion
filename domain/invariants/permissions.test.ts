import * as permissions from './permissions'
import { Project, User, Publication } from 'domain/types/model'

const positiveRankCondition = { factor: 1, max: 100, min: 0 }
const negativeRankCondition = { factor: -1, max: 0, min: -100 }

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
    canUpdatePublication: { beenionRank: 100 },
    canDeletePublication: { beenionRank: 100 },
    canCreateProject: { beenionRank: 100 },
    canDeleteProject: { beenionRank: 100 },
    canPublishProject: { beenionRank: 100 },
    canBanProject: { beenionRank: 100 },
    canUpdateProject: { beenionRank: 100 },
    canResubmitProject: { beenionRank: 100 },
    canVoteWithGold: { beenionRank: 100 },
    canVoteWithSilver: { beenionRank: 100 },
    canVoteWithBronze: { beenionRank: 100 }
  },
  rankConditions: {
    ReviewInvitationAccepted: positiveRankCondition,
    ReviewInvitationDeclined: negativeRankCondition,
    ReviewInvitationExpired: negativeRankCondition,
    ProjectUpvotedWithGold: positiveRankCondition,
    ProjectUpvotedWithSilver: positiveRankCondition,
    ProjectUpvotedWithBronze: positiveRankCondition,
    ProjectDownvotedWithGold: negativeRankCondition,
    ProjectDownvotedWithSilver: negativeRankCondition,
    ProjectDownvotedWithBronze: negativeRankCondition,
    ReviewUpvotedWithGold: positiveRankCondition,
    ReviewUpvotedWithSilver: positiveRankCondition,
    ReviewUpvotedWithBronze: positiveRankCondition,
    ReviewDownvotedWithGold: negativeRankCondition,
    ReviewDownvotedWithSilver: negativeRankCondition,
    ReviewDownvotedWithBronze: negativeRankCondition
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
      evaluation: 'accept'
    },
    {
      reviewerId: 'test-user2-uuid',
      evaluation: 'accept'
    },
    {
      reviewerId: 'test-user3-uuid',
      evaluation: 'reject'
    }
  ],
  reviewProcessCompleted: false,
  banned: false
}

describe('project invariants', () => {

  it('should not delete project - not owner nor sufficient rank', () => {
    const user = {
      ...genericUser
    }
    const publication = {
      ...genericPublication,
      privileges: {
        ...genericPublication.privileges,
        canDeleteProject: { beenionRank: 10 }
      }
    }
    const project = {
      ...genericProject
    }
    expect(permissions.canDeleteProject(user, project, publication)).toBe(false)
  })

  it('should delete project - sufficient rank', () => {
    const user = {
      ...genericUser,
      beenionAnalytics: {
        ...genericUser.beenionAnalytics,
        UserUpvotedWithGold: 100
      }
    }
    const publication = {
      ...genericPublication,
      privileges: {
        ...genericPublication.privileges,
        canDeleteProject: { beenionRank: 10 }
      }
    }
    const project = {
      ...genericProject
    }
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
  })

  it('should delete project - project owner', () => {
    const user = {
      ...genericUser,
      userId: 'test-user'
    }
    const publication = {
      ...genericPublication,
      privileges: {
        ...genericPublication.privileges,
        canDeleteProject: { beenionRank: 10 }
      }
    }
    const project = {
      ...genericProject,
      ownerId: 'test-user'
    }
    expect(permissions.canDeleteProject(user, project, publication)).toBe(true)
  })
})

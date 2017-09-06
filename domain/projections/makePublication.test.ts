import makePublication from './makePublication'
import { PublicationEvent } from 'domain/types/events'

describe('Publication projection', () => {
  const genericPrivileges = {
    canUpdatePublication: { beenionRank: 10 },
    canDeletePublication: { beenionRank: 10 },
    canCreateProject: { beenionRank: 10 },
    canDeleteProject: { beenionRank: 10 },
    canBanProject: { beenionRank: 10 },
    canUpdateProject: { beenionRank: 10 },
    canResubmitProject: { beenionRank: 10 },
    canVoteWithGold: { beenionRank: 10 },
    canVoteWithSilver: { beenionRank: 10 },
    canVoteWithBronze: { beenionRank: 10 }
  }

  const positiveRankCondition = { factor: 1, max: 100, min: 0 }
  const negativeRankCondition = { factor: -1, max: 0, min: -100 }
  const genericRankConditions = {
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
  }

  const genericProjectStageRules = [
    {
      canReview: {
        beenionRank: 0,
        publicationRank: 10
      },
      maxReviewers: 3,
      threshold: 2
    }
  ]

  it('should create publication object', () => {
    const publicationEvents: PublicationEvent[] = [
      {
        type: 'PublicationCreated',
        publicationId: 'test-publication-uuid',
        ownerId: 'test-user-uuid',
        title: 'Title',
        description: 'Description',
        privileges: genericPrivileges,
        rankConditions: genericRankConditions,
        projectStageRules: genericProjectStageRules,
        timestamp: Date.now()
      }
    ]

    const publication = makePublication(publicationEvents)

    expect(publication).toEqual({
      publicationId: 'test-publication-uuid',
      privileges: genericPrivileges,
      rankConditions: genericRankConditions,
      projectStageRules: genericProjectStageRules
    })
  })

  it('should update project stage rules', () => {
    const publicationEvents: PublicationEvent[] = [
      {
        type: 'PublicationCreated',
        publicationId: 'test-publication-uuid',
        ownerId: 'test-user-uuid',
        title: 'Title',
        description: 'Description',
        privileges: genericPrivileges,
        rankConditions: genericRankConditions,
        projectStageRules: genericProjectStageRules,
        timestamp: Date.now()
      },
      {
        type: 'ProjectStageRulesUpdated',
        publicationId: 'test-publication-uuid',
        projectStageRules: [
          ...genericProjectStageRules,
          {
            canReview: {
              beenionRank: 100,
              publicationRank: 5
            },
            maxReviewers: 3,
            threshold: 1
          }
        ],
        timestamp: Date.now()
      }
    ]

    const publication = makePublication(publicationEvents)

    expect(publication).toEqual({
      publicationId: 'test-publication-uuid',
      privileges: genericPrivileges,
      rankConditions: genericRankConditions,
      projectStageRules: [
        ...genericProjectStageRules,
        {
          canReview: {
            beenionRank: 100,
            publicationRank: 5
          },
          maxReviewers: 3,
          threshold: 1
        }
      ]
    })
  })
})

import makePublication from './makePublication'
import { RankConditions, PublicationPrivileges } from './types/model'
import { PublicationEvent } from './types/events'

describe('Publication projection', () => {
  const genericPrivileges: PublicationPrivileges = {
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

  const genericRankConditions: RankConditions = {
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

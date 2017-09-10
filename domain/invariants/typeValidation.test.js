const validate = require('./typeValidation')

describe('type validation', () => {
  it('it should validate Title type', () => {
    expect(validate.isTitle('title')).toBe(true)
    expect(validate.isTitle()).toBe(false)
    expect(validate.isTitle(12)).toBe(false)
    expect(validate.isTitle({})).toBe(false)
    expect(validate.isTitle([])).toBe(false)

    const longStr = new Array(200).join('x')
    expect(validate.isTitle(longStr)).toBe(false)
  })

  it('it should validate Description type', () => {
    expect(validate.isDescription('description')).toBe(true)
    expect(validate.isDescription()).toBe(false)
    expect(validate.isDescription(12)).toBe(false)
    expect(validate.isDescription({})).toBe(false)
    expect(validate.isDescription([])).toBe(false)

    const longStr = new Array(200).join('x')
    expect(validate.isDescription(longStr)).toBe(true)
  })

  it('it should validate Evaluation type', () => {
    expect(validate.isEvaluation('approve')).toBe(true)
    expect(validate.isEvaluation('reject')).toBe(true)
    expect(validate.isEvaluation('rand')).toBe(false)
    expect(validate.isEvaluation()).toBe(false)
    expect(validate.isEvaluation(12)).toBe(false)
    expect(validate.isEvaluation({})).toBe(false)
    expect(validate.isEvaluation([])).toBe(false)
  })

  it('it should validate Timestamp type', () => {
    expect(validate.isTimestamp(1483228900000)).toBe(true)
    expect(validate.isTimestamp('str')).toBe(false)
    expect(validate.isTimestamp()).toBe(false)
    expect(validate.isTimestamp(12)).toBe(false)
    expect(validate.isTimestamp({})).toBe(false)
    expect(validate.isTimestamp([])).toBe(false)
    expect(validate.isTimestamp(1183228900000)).toBe(false)
    expect(validate.isTimestamp(9183228900000)).toBe(false)
  })

  it('it should validate UUID type', () => {
    expect(validate.isUUID('str')).toBe(true)
    expect(validate.isUUID()).toBe(false)
    expect(validate.isUUID(12)).toBe(false)
    expect(validate.isUUID({})).toBe(false)
    expect(validate.isUUID([])).toBe(false)
  })

  it('it should validate URL type', () => {
    expect(validate.isURL('http://test.com')).toBe(true)
    expect(validate.isURL('www.site.com')).toBe(true)
    expect(validate.isURL()).toBe(false)
    expect(validate.isURL(12)).toBe(false)
    expect(validate.isURL({})).toBe(false)
    expect(validate.isURL([])).toBe(false)
    expect(validate.isURL('str')).toBe(false)
    expect(validate.isURL('site.com')).toBe(false)
    expect(validate.isURL('ww.site.com')).toBe(false)
  })

  it('it should validate PriviligeConditions type', () => {
    expect(
      validate.isPrivilegeConditions({
        userAccessList: [],
        beenionRank: 0,
        publicationRank: 0
      })
    ).toBe(true)

    expect(
      validate.isPrivilegeConditions({
        userAccessList: [],
        beenionRank: 0
      })
    ).toBe(true)

    expect(
      validate.isPrivilegeConditions({
        userAccessList: [],
        publicationRank: 0
      })
    ).toBe(true)

    expect(
      validate.isPrivilegeConditions({
        userAccessList: {},
        beenionRank: 0,
        publicationRank: 0
      })
    ).toBe(false)

    expect(
      validate.isPrivilegeConditions({
        userAccessList: [1, 2],
        beenionRank: 0,
        publicationRank: 0
      })
    ).toBe(false)

    expect(
      validate.isPrivilegeConditions({
        userAccessList: [],
        beenionRank: 'not number',
        publicationRank: 0
      })
    ).toBe(false)

    expect(
      validate.isPrivilegeConditions({
        userAccessList: [],
        beenionRank: 0,
        publicationRank: 'not number'
      })
    ).toBe(false)

    expect(validate.isPrivilegeConditions('str')).toBe(false)
    expect(validate.isPrivilegeConditions()).toBe(false)
    expect(validate.isPrivilegeConditions(12)).toBe(false)
    expect(validate.isPrivilegeConditions({})).toBe(false)
    expect(validate.isPrivilegeConditions([])).toBe(false)
  })

  it('it should validate PublicationPrivileges type', () => {
    expect(
      validate.isPublicationPrivileges({
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
      })
    ).toBe(true)

    expect(
      validate.isPublicationPrivileges({
        canUpdatePublication: 'invalid',
        canDeletePublication: { beenionRank: 10 },
        canCreateProject: { beenionRank: 10 },
        canDeleteProject: { beenionRank: 10 },
        canBanProject: { beenionRank: 10 },
        canUpdateProject: { beenionRank: 10 },
        canResubmitProject: { beenionRank: 10 },
        canVoteWithGold: { beenionRank: 10 },
        canVoteWithSilver: { beenionRank: 10 },
        canVoteWithBronze: { beenionRank: 10 }
      })
    ).toBe(false)

    expect(
      validate.isPublicationPrivileges({
        //canUpdatePublication: { beenionRank: 10 },
        canDeletePublication: { beenionRank: 10 },
        canCreateProject: { beenionRank: 10 },
        canDeleteProject: { beenionRank: 10 },
        canBanProject: { beenionRank: 10 },
        canUpdateProject: { beenionRank: 10 },
        canResubmitProject: { beenionRank: 10 },
        canVoteWithGold: { beenionRank: 10 },
        canVoteWithSilver: { beenionRank: 10 },
        canVoteWithBronze: { beenionRank: 10 }
      })
    ).toBe(false)

    expect(
      validate.isPublicationPrivileges({
        mistypedKey: { beenionRank: 10 },
        canDeletePublication: { beenionRank: 10 },
        canCreateProject: { beenionRank: 10 },
        canDeleteProject: { beenionRank: 10 },
        canBanProject: { beenionRank: 10 },
        canUpdateProject: { beenionRank: 10 },
        canResubmitProject: { beenionRank: 10 },
        canVoteWithGold: { beenionRank: 10 },
        canVoteWithSilver: { beenionRank: 10 },
        canVoteWithBronze: { beenionRank: 10 }
      })
    ).toBe(false)

    expect(validate.isPublicationPrivileges()).toBe(false)
    expect(validate.isPublicationPrivileges(12)).toBe(false)
    expect(validate.isPublicationPrivileges({})).toBe(false)
    expect(validate.isPublicationPrivileges([])).toBe(false)
    expect(validate.isPublicationPrivileges('str')).toBe(false)
  })

  it('it should validate RankConditions type', () => {
    expect(
      validate.isRankConditions({
        events: {
          UserUpvotedWithGold: { factor: 100, group: 'gold' },
          UserDownvotedWithGold: { factor: -100, group: 'gold' },
          UserUpvotedWithSilver: { factor: 10, group: 'silver' },
          UserDownvotedWithSilver: { factor: -10, group: 'silver' },
          UserUpvotedWithBronze: { factor: 1, group: 'bronze' },
          UserDownvotedWithBronze: { factor: -1, group: 'bronze' }
        },
        groups: {
          gold: { min: -1000, max: 1000 },
          silver: { min: -100, max: 100 },
          bronze: { min: -100, max: 100 }
        }
      })
    ).toBe(true)

    expect(
      validate.isRankConditions({
        groups: {
          gold: { min: -1000, max: 1000 },
          silver: { min: -100, max: 100 },
          bronze: { min: -100, max: 100 }
        }
      })
    ).toBe(false)

    expect(
      validate.isRankConditions({
        events: {
          UserUpvotedWithGold: 'invalid',
          UserDownvotedWithGold: { factor: -100, group: 'gold' },
          UserUpvotedWithSilver: { factor: 10, group: 'silver' },
          UserDownvotedWithSilver: { factor: -10, group: 'silver' },
          UserUpvotedWithBronze: { factor: 1, group: 'bronze' },
          UserDownvotedWithBronze: { factor: -1, group: 'bronze' }
        }
      })
    ).toBe(false)

    expect(
      validate.isRankConditions({
        events: {
          UserUpvotedWithGold: 'invalid',
          UserDownvotedWithGold: { factor: -100, group: 'gold' },
          UserUpvotedWithSilver: { factor: 10, group: 'silver' },
          UserDownvotedWithSilver: { factor: -10, group: 'silver' },
          UserUpvotedWithBronze: { factor: 1, group: 'bronze' },
          UserDownvotedWithBronze: { factor: -1, group: 'bronze' }
        },
        groups: {
          gold: { min: -1000, max: 1000 },
          silver: { min: -100, max: 100 },
          bronze: { min: -100, max: 100 }
        }
      })
    ).toBe(false)

    expect(
      validate.isRankConditions({
        events: {
          UserUpvotedWithGold: { factor: 100, group: 'gold' },
          UserDownvotedWithGold: { factor: -100, group: 'gold' },
          UserUpvotedWithSilver: { factor: 10, group: 'silver' },
          UserDownvotedWithSilver: { factor: -10, group: 'silver' },
          UserUpvotedWithBronze: { factor: 1, group: 'bronze' },
          UserDownvotedWithBronze: { factor: -1, group: 'bronze' }
        },
        groups: {
          gold: 'invalid',
          silver: { min: -100, max: 100 },
          bronze: { min: -100, max: 100 }
        }
      })
    ).toBe(false)

    expect(validate.isRankConditions()).toBe(false)
    expect(validate.isRankConditions(12)).toBe(false)
    expect(validate.isRankConditions({})).toBe(false)
    expect(validate.isRankConditions([])).toBe(false)
    expect(validate.isRankConditions('str')).toBe(false)
  })

  it('it should validate ProjectStageRules type', () => {
    expect(
      validate.isProjectStageRules([
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
      ])
    ).toBe(true)

    expect(
      validate.isProjectStageRules([
        {
          canReview: {
            beenionRank: 0,
            publicationRank: 10
          },
          // maxReviewers: 3,
          threshold: 2
        }
      ])
    ).toBe(false)

    expect(
      validate.isProjectStageRules([
        {
          canReview: {
            beenionRank: 0,
            publicationRank: 10
          },
          maxReviewers: 3
          // threshold: 2
        }
      ])
    ).toBe(false)

    expect(
      validate.isProjectStageRules([
        {
          maxReviewers: 3,
          threshold: 2
        }
      ])
    ).toBe(false)

    expect(
      validate.isProjectStageRules([
        {
          canReview: 'invalid',
          maxReviewers: 3,
          threshold: 2
        }
      ])
    ).toBe(false)

    expect(validate.isProjectStageRules()).toBe(false)
    expect(validate.isProjectStageRules(12)).toBe(false)
    expect(validate.isProjectStageRules({})).toBe(false)
    expect(validate.isProjectStageRules([])).toBe(false)
    expect(validate.isProjectStageRules('str')).toBe(false)
  })

  it('it should validate Event type', () => {
    expect(
      validate.isEvent({
        type: 'eventtype',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isEvent({
        //type: 'eventtype',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(
      validate.isEvent({
        type: 'eventtype'
        //timestamp: Date.now()
      })
    ).toBe(false)

    expect(validate.isEvent('str')).toBe(false)
    expect(validate.isEvent()).toBe(false)
    expect(validate.isEvent(12)).toBe(false)
    expect(validate.isEvent({})).toBe(false)
    expect(validate.isEvent([])).toBe(false)
  })

  it('it should validate PublicationEvent type', () => {
    expect(
      validate.isPublicationEvent({
        type: 'PublicationTitleUpdated',
        publicationId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isPublicationEvent({
        type: 'PublicationTitleUpdated',
        //publicationId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(
      validate.isPublicationEvent({
        type: 'Invalid Type',
        publicationId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(validate.isPublicationEvent('str')).toBe(false)
    expect(validate.isPublicationEvent()).toBe(false)
    expect(validate.isPublicationEvent(12)).toBe(false)
    expect(validate.isPublicationEvent({})).toBe(false)
    expect(validate.isPublicationEvent([])).toBe(false)
  })

  it('it should validate ProjectEvent type', () => {
    expect(
      validate.isProjectEvent({
        type: 'ProjectTitleUpdated',
        projectId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isProjectEvent({
        type: 'PublicationTitleUpdated',
        //projectId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(
      validate.isProjectEvent({
        type: 'Invalid Type',
        projectId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(validate.isProjectEvent('str')).toBe(false)
    expect(validate.isProjectEvent()).toBe(false)
    expect(validate.isProjectEvent(12)).toBe(false)
    expect(validate.isProjectEvent({})).toBe(false)
    expect(validate.isProjectEvent([])).toBe(false)
  })

  it('it should validate UserEvent type', () => {
    expect(
      validate.isUserEvent({
        type: 'ReviewInvitationAccepted',
        userId: 'UUID',
        projectId: 'UUID',
        publicationId: 'UUID',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isUserEvent({
        type: 'PublicationTitleUpdated',
        //userId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(
      validate.isUserEvent({
        type: 'Invalid Type',
        userId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(validate.isUserEvent('str')).toBe(false)
    expect(validate.isUserEvent()).toBe(false)
    expect(validate.isUserEvent(12)).toBe(false)
    expect(validate.isUserEvent({})).toBe(false)
    expect(validate.isUserEvent([])).toBe(false)
  })

  it('it should validate PublicationHistory type', () => {
    expect(
      validate.isPublicationHistory([
        {
          type: 'PublicationTitleUpdated',
          publicationId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'PublicationDeleted',
          userId: 'UUID',
          publicationId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(true)

    expect(
      validate.isPublicationHistory([
        {
          type: 'PublicationTitleUpdated',
          publicationId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'Invalid type',
          userId: 'UUID',
          publicationId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(false)

    expect(validate.isPublicationHistory('str')).toBe(false)
    expect(validate.isPublicationHistory()).toBe(false)
    expect(validate.isPublicationHistory(12)).toBe(false)
    expect(validate.isPublicationHistory({})).toBe(false)
    expect(validate.isPublicationHistory([])).toBe(false)
  })

  it('it should validate ProjectHistory type', () => {
    expect(
      validate.isProjectHistory([
        {
          type: 'ProjectTitleUpdated',
          projectId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'ProjectDeleted',
          projectId: 'UUID',
          userId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(true)

    expect(
      validate.isProjectHistory([
        {
          type: 'ProjectTitleUpdated',
          ProjectId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'Invalid type',
          userId: 'UUID',
          ProjectId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(false)

    expect(validate.isProjectHistory('str')).toBe(false)
    expect(validate.isProjectHistory()).toBe(false)
    expect(validate.isProjectHistory(12)).toBe(false)
    expect(validate.isProjectHistory({})).toBe(false)
    expect(validate.isProjectHistory([])).toBe(false)
  })

  it('it should validate UserHistory type', () => {
    expect(
      validate.isUserHistory([
        {
          type: 'ReviewInvitationAccepted',
          userId: 'UUID',
          projectId: 'UUID',
          publicationId: 'UUID',
          timestamp: Date.now()
        },
        {
          type: 'ReviewInvitationDeclined',
          userId: 'UUID',
          projectId: 'UUID',
          publicationId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(true)

    expect(
      validate.isUserHistory([
        {
          type: 'UserTitleUpdated',
          UserId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'Invalid title',
          userId: 'UUID',
          projectId: 'UUID',
          publicationId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(false)

    expect(validate.isUserHistory('str')).toBe(false)
    expect(validate.isUserHistory()).toBe(false)
    expect(validate.isUserHistory(12)).toBe(false)
    expect(validate.isUserHistory({})).toBe(false)
    expect(validate.isUserHistory([])).toBe(false)
  })
})

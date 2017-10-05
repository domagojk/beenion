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

  it('it should validate PublicationPermission type', () => {
    expect(
      validate.isPublicationPermission({
        users: [],
        beenionRank: 0,
        publicationRank: 0
      })
    ).toBe(true)

    expect(
      validate.isPublicationPermission({
        users: [],
        beenionRank: 0
      })
    ).toBe(true)

    expect(
      validate.isPublicationPermission({
        users: [],
        publicationRank: 0
      })
    ).toBe(true)

    expect(
      validate.isPublicationPermission({
        users: {},
        beenionRank: 0,
        publicationRank: 0
      })
    ).toBe(false)

    expect(
      validate.isPublicationPermission({
        users: [1, 2],
        beenionRank: 0,
        publicationRank: 0
      })
    ).toBe(false)

    expect(
      validate.isPublicationPermission({
        users: [],
        beenionRank: 'not number',
        publicationRank: 0
      })
    ).toBe(false)

    expect(
      validate.isPublicationPermission({
        users: [],
        beenionRank: 0,
        publicationRank: 'not number'
      })
    ).toBe(false)

    expect(validate.isPublicationPermission('str')).toBe(false)
    expect(validate.isPublicationPermission()).toBe(false)
    expect(validate.isPublicationPermission(12)).toBe(false)
    expect(validate.isPublicationPermission({})).toBe(false)
    expect(validate.isPublicationPermission([])).toBe(false)
  })

  it('it should validate StageRule type', () => {
    expect(
      validate.isStageRule({
        maxReviewers: 3,
        threshold: 2
      })).toBe(true)

    expect(
      validate.isStageRule({
        maxReviewers: 3,
        //threshold: 2
      })).toBe(false)

    expect(
      validate.isStageRule({
        //maxReviewers: 3,
        threshold: 2
      })).toBe(false)

    expect(validate.isStageRule()).toBe(false)
    expect(validate.isStageRule(12)).toBe(false)
    expect(validate.isStageRule({})).toBe(false)
    expect(validate.isStageRule([])).toBe(false)
    expect(validate.isStageRule('str')).toBe(false)
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
        type: 'PublicationTitleDefined',
        publicationId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isPublicationEvent({
        type: 'PublicationTitleDefined',
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
        type: 'ProjectTitleDefined',
        projectId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isProjectEvent({
        type: 'PublicationTitleDefined',
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
        type: 'ReviewInvitationExpired',
        userId: 'UUID',
        projectId: 'UUID',
        publicationId: 'UUID',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isUserEvent({
        type: 'PublicationTitleDefined',
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
          type: 'PublicationTitleDefined',
          publicationId: 'UUID',
          title: 'Title',
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
          type: 'PublicationTitleDefined',
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
          type: 'ProjectTitleDefined',
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
          type: 'ProjectTitleDefined',
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
          type: 'ReviewInvitationExpired',
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

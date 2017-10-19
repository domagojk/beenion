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

  it('it should validate JournalPermission type', () => {
    expect(
      validate.isJournalPermission({
        users: [],
        beenionRank: 0,
        journalRank: 0
      })
    ).toBe(true)

    expect(
      validate.isJournalPermission({
        users: [],
        beenionRank: 0
      })
    ).toBe(true)

    expect(
      validate.isJournalPermission({
        users: [],
        journalRank: 0
      })
    ).toBe(true)

    expect(
      validate.isJournalPermission({
        users: {},
        beenionRank: 0,
        journalRank: 0
      })
    ).toBe(false)

    expect(
      validate.isJournalPermission({
        users: [1, 2],
        beenionRank: 0,
        journalRank: 0
      })
    ).toBe(false)

    expect(
      validate.isJournalPermission({
        users: [],
        beenionRank: 'not number',
        journalRank: 0
      })
    ).toBe(false)

    expect(
      validate.isJournalPermission({
        users: [],
        beenionRank: 0,
        journalRank: 'not number'
      })
    ).toBe(false)

    expect(validate.isJournalPermission('str')).toBe(false)
    expect(validate.isJournalPermission()).toBe(false)
    expect(validate.isJournalPermission(12)).toBe(false)
    expect(validate.isJournalPermission({})).toBe(false)
    expect(validate.isJournalPermission([])).toBe(false)
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

  it('it should validate JournalEvent type', () => {
    expect(
      validate.isJournalEvent({
        type: 'JournalTitleDefined',
        journalId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isJournalEvent({
        type: 'JournalTitleDefined',
        //journalId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(
      validate.isJournalEvent({
        type: 'Invalid Type',
        journalId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(validate.isJournalEvent('str')).toBe(false)
    expect(validate.isJournalEvent()).toBe(false)
    expect(validate.isJournalEvent(12)).toBe(false)
    expect(validate.isJournalEvent({})).toBe(false)
    expect(validate.isJournalEvent([])).toBe(false)
  })

  it('it should validate ArticleEvent type', () => {
    expect(
      validate.isArticleEvent({
        type: 'ArticleTitleDefined',
        articleId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isArticleEvent({
        type: 'JournalTitleDefined',
        //articleId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(
      validate.isArticleEvent({
        type: 'Invalid Type',
        articleId: 'UUID',
        title: 'title',
        timestamp: Date.now()
      })
    ).toBe(false)

    expect(validate.isArticleEvent('str')).toBe(false)
    expect(validate.isArticleEvent()).toBe(false)
    expect(validate.isArticleEvent(12)).toBe(false)
    expect(validate.isArticleEvent({})).toBe(false)
    expect(validate.isArticleEvent([])).toBe(false)
  })

  it('it should validate UserEvent type', () => {
    expect(
      validate.isUserEvent({
        type: 'ReviewInvitationExpired',
        userId: 'UUID',
        articleId: 'UUID',
        journalId: 'UUID',
        timestamp: Date.now()
      })
    ).toBe(true)

    expect(
      validate.isUserEvent({
        type: 'JournalTitleDefined',
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

  it('it should validate journalHistory type', () => {
    expect(
      validate.isJournalHistory([
        {
          type: 'JournalTitleDefined',
          journalId: 'UUID',
          title: 'Title',
          timestamp: Date.now()
        },
        {
          type: 'JournalDeleted',
          userId: 'UUID',
          journalId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(true)

    expect(
      validate.isJournalHistory([
        {
          type: 'JournalTitleDefined',
          journalId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'Invalid type',
          userId: 'UUID',
          journalId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(false)

    expect(validate.isJournalHistory('str')).toBe(false)
    expect(validate.isJournalHistory()).toBe(false)
    expect(validate.isJournalHistory(12)).toBe(false)
    expect(validate.isJournalHistory({})).toBe(false)
    expect(validate.isJournalHistory([])).toBe(false)
  })

  it('it should validate ArticleHistory type', () => {
    expect(
      validate.isArticleHistory([
        {
          type: 'ArticleTitleDefined',
          articleId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'ArticleDeleted',
          articleId: 'UUID',
          userId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(true)

    expect(
      validate.isArticleHistory([
        {
          type: 'ArticleTitleDefined',
          ArticleId: 'UUID',
          title: 'title',
          timestamp: Date.now()
        },
        {
          type: 'Invalid type',
          userId: 'UUID',
          ArticleId: 'UUID',
          timestamp: Date.now()
        }
      ])
    ).toBe(false)

    expect(validate.isArticleHistory('str')).toBe(false)
    expect(validate.isArticleHistory()).toBe(false)
    expect(validate.isArticleHistory(12)).toBe(false)
    expect(validate.isArticleHistory({})).toBe(false)
    expect(validate.isArticleHistory([])).toBe(false)
  })

  it('it should validate UserHistory type', () => {
    expect(
      validate.isUserHistory([
        {
          type: 'ReviewInvitationExpired',
          userId: 'UUID',
          articleId: 'UUID',
          journalId: 'UUID',
          timestamp: Date.now()
        },
        {
          type: 'ReviewInvitationDeclined',
          userId: 'UUID',
          articleId: 'UUID',
          journalId: 'UUID',
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
          articleId: 'UUID',
          journalId: 'UUID',
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

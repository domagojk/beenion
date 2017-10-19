import reduceToArticle from './reduceToArticle'
import { Article } from './types/model'
import { ArticleEvent } from './types/events'

describe('Article articleion', () => {
  const articleCreatedEvent = {
    type: 'ArticleCreated',
    articleId: 'test-article-uuid',
    journalId: 'test-journal-uuid',
    ownerId: 'test-user-uuid',
    timestamp: Date.now()
  } as ArticleEvent

  const genericArticle = {
    articleId: 'test-article-uuid',
    ownerId: 'test-user-uuid',
    stageRules: null,
    lastStage: null,
    currentStage: 0,
    reviewers: [],
    evaluations: [],
    reviewProcessCompleted: false,
    approved: false,
    banned: false
  } as Article

  it('should create a article object', () => {
    const articleEvents = [articleCreatedEvent]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({...genericArticle})
  })

  it('should add in reviewers list', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleReviewerInvited',
        articleId: 'test-article-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ArticleReviewerInvited',
        articleId: 'test-article-uuid',
        reviewerId: 'test-reviewer2-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      reviewers: ['test-reviewer1-uuid', 'test-reviewer2-uuid']
    })
  })

  it('should remove from reviewers list', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleReviewerInvited',
        articleId: 'test-article-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ArticleReviewerInvited',
        articleId: 'test-article-uuid',
        reviewerId: 'test-reviewer2-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ArticleReviewerRemoved',
        articleId: 'test-article-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      reviewers: ['test-reviewer2-uuid']
    })
  })

  it('should add in evaluations list', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleReviewerInvited',
        articleId: 'test-article-uuid',
        reviewerId: 'test-reviewer1-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ArticleReviewed',
        articleId: 'test-article-uuid',
        reviewerId: 'test-reviewer1-uuid',
        evaluation: 'approve',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      reviewers: ['test-reviewer1-uuid'],
      evaluations: [
        {
          evaluation: 'approve',
          reviewerId: 'test-reviewer1-uuid'
        }
      ]
    })
  })

  it('should promote article to next stage', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleStageRulesDefined',
        articleId: 'test-article-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ArticlePromoted',
        articleId: 'test-article-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      stageRules: [
        { maxReviewers: 1, threshold: 2 },
        { maxReviewers: 3, threshold: 2 }
      ],
      lastStage: 1,
      currentStage: 1
    })
  })

  it('should reject article', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleStageRulesDefined',
        articleId: 'test-article-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ArticleRejected',
        articleId: 'test-article-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      reviewProcessCompleted: true
    })
  })

  it('should approve article', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleStageRulesDefined',
        articleId: 'test-article-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ArticleApproved',
        articleId: 'test-article-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      reviewProcessCompleted: true,
      approved: true
    })
  })

  it('should reset article data', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleStageRulesDefined',
        articleId: 'test-article-uuid',
        stageRules: [
          { maxReviewers: 1, threshold: 2 },
          { maxReviewers: 3, threshold: 2 }
        ],
        timestamp: Date.now()
      },
      {
        type: 'ArticleResubmitted',
        articleId: 'test-article-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle
    })
  })

  it('should ban article', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleBanned',
        userId: 'test-user-uuid',
        articleId: 'test-article-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      banned: true
    })
  })

  it('should unban article', () => {
    const articleEvents = [
      articleCreatedEvent,
      {
        type: 'ArticleBanned',
        userId: 'test-user-uuid',
        articleId: 'test-article-uuid',
        timestamp: Date.now()
      },
      {
        type: 'ArticleUnbanned',
        userId: 'test-user-uuid',
        articleId: 'test-article-uuid',
        timestamp: Date.now()
      }
    ] as ArticleEvent[]

    const article = reduceToArticle(articleEvents)

    expect(article).toEqual({
      ...genericArticle,
      banned: false
    })
  })
})

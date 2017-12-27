import reduceToNewsletter from './reduceToNewsletter'
import { NewsletterEvent } from '../../types'

describe('Newsletter projection', () => {
  it('should create newsletter object', () => {
    const newsletterEvents = [
      {
        type: 'NewsletterCreated',
        newsletterId: 'test-newsletter-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      }
    ] as NewsletterEvent[]

    const newsletter = reduceToNewsletter(newsletterEvents)

    expect(newsletter).toEqual({
      newsletterId: 'test-newsletter-uuid',
      privileges: null,
      rankCalcParams: {
        events: [],
        groups: []
      },
      editors: {
        invited: [],
        confirmed: []
      },
      stageRules: []
    })
  })

  it('should define article stage rules', () => {
    const newsletterEvents = [
      {
        type: 'NewsletterCreated',
        newsletterId: 'test-newsletter-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleDefined',
        newsletterId: 'test-newsletter-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleDefined',
        newsletterId: 'test-newsletter-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      }
    ] as NewsletterEvent[]

    const newsletter = reduceToNewsletter(newsletterEvents)

    expect(newsletter).toEqual({
      newsletterId: 'test-newsletter-uuid',
      privileges: null,
      rankCalcParams: {
        events: [],
        groups: []
      },
      editors: {
        invited: [],
        confirmed: []
      },
      stageRules: [
        { maxReviewers: 3, threshold: 2 },
        { maxReviewers: 3, threshold: 2 }
      ]
    })
  })

  it('should update article stage rule', () => {
    const newsletterEvents = [
      {
        type: 'NewsletterCreated',
        newsletterId: 'test-newsletter-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleDefined',
        newsletterId: 'test-newsletter-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleDefined',
        newsletterId: 'test-newsletter-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleDefined',
        newsletterId: 'test-newsletter-uuid',
        stage: 0,
        stageRule: { maxReviewers: 1, threshold: 1 },
        timestamp: Date.now()
      }
    ] as NewsletterEvent[]

    const newsletter = reduceToNewsletter(newsletterEvents)

    expect(newsletter).toEqual({
      newsletterId: 'test-newsletter-uuid',
      privileges: null,
      rankCalcParams: {
        events: [],
        groups: []
      },
      editors: {
        invited: [],
        confirmed: []
      },
      stageRules: [
        { maxReviewers: 1, threshold: 1 },
        { maxReviewers: 3, threshold: 2 }
      ]
    })
  })

  it('should remove article stage rule', () => {
    const newsletterEvents = [
      {
        type: 'NewsletterCreated',
        newsletterId: 'test-newsletter-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleDefined',
        newsletterId: 'test-newsletter-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleDefined',
        newsletterId: 'test-newsletter-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'NewsletterStageRuleRemoved',
        newsletterId: 'test-newsletter-uuid',
        stage: 1,
        timestamp: Date.now()
      }
    ] as NewsletterEvent[]

    const newsletter = reduceToNewsletter(newsletterEvents)

    expect(newsletter).toEqual({
      newsletterId: 'test-newsletter-uuid',
      privileges: null,
      rankCalcParams: {
        events: [],
        groups: []
      },
      editors: {
        invited: [],
        confirmed: []
      },
      stageRules: [
        { maxReviewers: 3, threshold: 2 }
      ]
    })
  })
})

import reduceToPublication from './reduceToPublication'
import { PublicationEvent } from './types/events'

describe('Publication projection', () => {
  it('should create publication object', () => {
    const publicationEvents = [
      {
        type: 'PublicationCreated',
        publicationId: 'test-publication-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      }
    ] as PublicationEvent[]

    const publication = reduceToPublication(publicationEvents)

    expect(publication).toEqual({
      publicationId: 'test-publication-uuid',
      privilegeConditions: null,
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

  it('should define project stage rules', () => {
    const publicationEvents = [
      {
        type: 'PublicationCreated',
        publicationId: 'test-publication-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleDefined',
        publicationId: 'test-publication-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleDefined',
        publicationId: 'test-publication-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      }
    ] as PublicationEvent[]

    const publication = reduceToPublication(publicationEvents)

    expect(publication).toEqual({
      publicationId: 'test-publication-uuid',
      privilegeConditions: null,
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

  it('should update project stage rule', () => {
    const publicationEvents = [
      {
        type: 'PublicationCreated',
        publicationId: 'test-publication-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleDefined',
        publicationId: 'test-publication-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleDefined',
        publicationId: 'test-publication-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleDefined',
        publicationId: 'test-publication-uuid',
        stage: 0,
        stageRule: { maxReviewers: 1, threshold: 1 },
        timestamp: Date.now()
      }
    ] as PublicationEvent[]

    const publication = reduceToPublication(publicationEvents)

    expect(publication).toEqual({
      publicationId: 'test-publication-uuid',
      privilegeConditions: null,
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

  it('should remove project stage rule', () => {
    const publicationEvents = [
      {
        type: 'PublicationCreated',
        publicationId: 'test-publication-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleDefined',
        publicationId: 'test-publication-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleDefined',
        publicationId: 'test-publication-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'PublicationStageRuleRemoved',
        publicationId: 'test-publication-uuid',
        stage: 1,
        timestamp: Date.now()
      }
    ] as PublicationEvent[]

    const publication = reduceToPublication(publicationEvents)

    expect(publication).toEqual({
      publicationId: 'test-publication-uuid',
      privilegeConditions: null,
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

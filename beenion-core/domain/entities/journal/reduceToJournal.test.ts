import reduceToJournal from './reduceToJournal'
import { JournalEvent } from '../../types'

describe('Journal projection', () => {
  it('should create journal object', () => {
    const journalEvents = [
      {
        type: 'JournalCreated',
        journalId: 'test-journal-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      }
    ] as JournalEvent[]

    const journal = reduceToJournal(journalEvents)

    expect(journal).toEqual({
      journalId: 'test-journal-uuid',
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
    const journalEvents = [
      {
        type: 'JournalCreated',
        journalId: 'test-journal-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleDefined',
        journalId: 'test-journal-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleDefined',
        journalId: 'test-journal-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      }
    ] as JournalEvent[]

    const journal = reduceToJournal(journalEvents)

    expect(journal).toEqual({
      journalId: 'test-journal-uuid',
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
    const journalEvents = [
      {
        type: 'JournalCreated',
        journalId: 'test-journal-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleDefined',
        journalId: 'test-journal-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleDefined',
        journalId: 'test-journal-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleDefined',
        journalId: 'test-journal-uuid',
        stage: 0,
        stageRule: { maxReviewers: 1, threshold: 1 },
        timestamp: Date.now()
      }
    ] as JournalEvent[]

    const journal = reduceToJournal(journalEvents)

    expect(journal).toEqual({
      journalId: 'test-journal-uuid',
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
    const journalEvents = [
      {
        type: 'JournalCreated',
        journalId: 'test-journal-uuid',
        ownerId: 'test-user-uuid',
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleDefined',
        journalId: 'test-journal-uuid',
        stage: 0,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleDefined',
        journalId: 'test-journal-uuid',
        stage: 1,
        stageRule: { maxReviewers: 3, threshold: 2 },
        timestamp: Date.now()
      },
      {
        type: 'JournalStageRuleRemoved',
        journalId: 'test-journal-uuid',
        stage: 1,
        timestamp: Date.now()
      }
    ] as JournalEvent[]

    const journal = reduceToJournal(journalEvents)

    expect(journal).toEqual({
      journalId: 'test-journal-uuid',
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

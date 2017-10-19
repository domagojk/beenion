import { Journal, Article, User, UserId } from './types/model'
import * as rules from './businessRules'

const genericJournal = {
  journalId: 'test-journal-id',
  privilegeConditions: {
    canReviewInStage0: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canReviewInStage1: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canUpdateJournal: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canDeleteJournal: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canCreateArticle: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canDeleteArticle: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canBanArticle: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canUpdateArticle: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canResubmitArticle: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canVoteWithGold: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canVoteWithSilver: { beenionRank: { min: 5 }, journalRank: { min: 5 } },
    canVoteWithBronze: { beenionRank: { min: 1 }, journalRank: { min: 1 } }
  },
  rankCalcParams: {
    events: [
      { eventType: 'ReviewInvitationDeclined', factor: -1, group: 'invitation' },
      { eventType: 'ReviewInvitationExpired', factor: -1, group: 'invitation' },
      { eventType: 'ArticleUpvotedWithGold', factor: 10, group: 'articleGold' },
      { eventType: 'ArticleUpvotedWithSilver', factor: 5, group: 'articleSilver' },
      { eventType: 'ArticleUpvotedWithBronze', factor: 1, group: 'articleBronze' },
      { eventType: 'ArticleDownvotedWithGold', factor: -10, group: 'articleGold' },
      { eventType: 'ArticleDownvotedWithSilver', factor: -5, group: 'articleSilver' },
      { eventType: 'ArticleDownvotedWithBronze', factor: -1, group: 'articleBronze' },
      { eventType: 'ReviewUpvotedWithGold', factor: 10, group: 'reviewGold' },
      { eventType: 'ReviewUpvotedWithSilver', factor: 5, group: 'reviewSilver' },
      { eventType: 'ReviewUpvotedWithBronze', factor: 1, group: 'reviewBronze' },
      { eventType: 'ReviewDownvotedWithGold', factor: -10, group: 'reviewGold' },
      { eventType: 'ReviewDownvotedWithSilver', factor: -5, group: 'reviewSilver' },
      { eventType: 'ReviewDownvotedWithBronze', factor: -1, group: 'reviewBronze' }
    ],
    groups: [
      { group: 'invitation', rankRange: { min: -100, max: 100 } },
      { group: 'articleGold', rankRange: { min: -100, max: 100 } },
      { group: 'articleSilver', rankRange: { min: -100, max: 100 } },
      { group: 'articleBronze', rankRange: { min: -100, max: 100 } },
      { group: 'reviewGold', rankRange: { min: -100, max: 100 } },
      { group: 'reviewSilver', rankRange: { min: -100, max: 100 } },
      { group: 'reviewBronze', rankRange: { min: -100, max: 100 } }
    ]
  },
  stageRules: [
    { maxReviewers: 3, threshold: 2 },
    { maxReviewers: 3, threshold: 2 }
  ]
} as Journal

const genericArticle = {
  articleId: 'test-article-uuid',
  ownerId: 'test-articleowner-uuid',
  stageRules: genericJournal.stageRules,
  currentStage: 0,
  lastStage: genericJournal.stageRules.length - 1,
  reviewers: ['test-user1-uuid', 'test-user2-uuid', 'test-user3-uuid'],
  evaluations: [
    { reviewerId: 'test-user1-uuid', evaluation: 'approve' },
    { reviewerId: 'test-user2-uuid', evaluation: 'approve' },
    { reviewerId: 'test-user3-uuid', evaluation: 'reject' }
  ],
  reviewProcessCompleted: false,
  approved: false,
  banned: false
} as Article

const genericUser = {
  userId: 'test-user-uuid',
  mergedUserIds: [],
  rankEvents: []
} as User

describe('journal permissions', () => {
  it('should permit creating journal', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        }
      ]
    } as User

    expect(rules.canCreateJournal(user)).toBe(true)
  })

  it('should not permit creating journal', () => {
    const user = {
      ...genericUser
    }

    expect(rules.canCreateJournal(user)).toBe(false)
  })

  it('should accept journal commands - large beenionRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        }
      ]
    } as User

    const journal = {
      ...genericJournal
    }

    expect(rules.canUpdateJournal(user, journal)).toBe(true)
    expect(rules.canDeleteJournal(user, journal)).toBe(true)
  })

  it('should accept journal commands - large journalRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'ArticleVotes',
          journalId: genericJournal.journalId,
          eventType: 'ArticleUpvotedWithGold'
        }
      ]
    } as User

    const journal = {
      ...genericJournal
    }

    expect(rules.canUpdateJournal(user, journal)).toBe(true)
    expect(rules.canDeleteJournal(user, journal)).toBe(true)
  })
})

describe('article permissions', () => {
  it('should not accept command - not defined permission', () => {
    const user = {...genericUser}

    const journal = {
      ...genericJournal,
      privilegeConditions: {
        ...genericJournal.privilegeConditions,
        canBanArticle: null
      }
    } as Journal

    const article = {...genericArticle}

    expect(rules.canBanArticle(user, article, journal)).toBe(false)
  })

  it('should accept article commands - in user access list', () => {
    const user = {
      ...genericUser,
      userId: 'special-user-uuid'
    } as User

    const journal = {
      ...genericJournal,
      privilegeConditions: {
        canCreateArticle: { users: ['special-user-uuid'] },
        canDeleteArticle: { users: ['special-user-uuid'] },
        canBanArticle: { users: ['special-user-uuid'] },
        canUpdateArticle: { users: ['special-user-uuid'] }
      }
    } as Journal

    const article = {
      ...genericArticle
    }

    expect(rules.canCreateArticle(user, journal)).toBe(true)
    expect(rules.canDeleteArticle(user, article, journal)).toBe(true)
    expect(rules.canBanArticle(user, article, journal)).toBe(true)
    expect(rules.canUpdateArticle(user, article, journal)).toBe(true)
  })

  it('should accept article commands - large beenionRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        }
      ]
    } as User

    const journal = {
      ...genericJournal
    }
    const article = {
      ...genericArticle,
      reviewers: ['test-user1-uuid', 'test-user2-uuid']
    } as Article

    expect(rules.canCreateArticle(user, journal)).toBe(true)
    expect(rules.canDeleteArticle(user, article, journal)).toBe(true)
    expect(rules.canBanArticle(user, article, journal)).toBe(true)
    expect(rules.canUpdateArticle(user, article, journal)).toBe(true)
    expect(rules.canAddReviewer(user, article, journal)).toBe(true)
  })

  it('should accept article commands - large journalRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'ReviewVotes',
          journalId: 'test-journal-id',
          eventType: 'ReviewUpvotedWithGold'
        }
      ]
    } as User

    const journal = {
      ...genericJournal
    }
    const article = {
      ...genericArticle,
      reviewers: ['test-user1-uuid', 'test-user2-uuid']
    } as Article

    expect(rules.canCreateArticle(user, journal)).toBe(true)
    expect(rules.canDeleteArticle(user, article, journal)).toBe(true)
    expect(rules.canBanArticle(user, article, journal)).toBe(true)
    expect(rules.canUpdateArticle(user, article, journal)).toBe(true)
    expect(rules.canAddReviewer(user, article, journal)).toBe(true)
  })

  it('should not accept article commands - large beenionRank or journalRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        },
        {
          category: 'ArticleVotes',
          journalId: 'test-journal-id',
          eventType: 'ArticleUpvotedWithGold'
        }
      ]
    } as User

    const journal = {
      ...genericJournal
    }
    const article = {
      ...genericArticle
    }

    expect(rules.canResubmitArticle(user, article, journal)).toBe(false)
    expect(rules.canReviewArticle(user, article)).toBe(false)
  })

  it('should not accept article commands - insufficent beenionRank or journalRank', () => {
    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'UserVotes',
          eventType: 'UserUpvotedWithGold'
        },
        {
          category: 'ReviewVotes',
          journalId: 'test-journal-id',
          eventType: 'ReviewUpvotedWithGold'
        }
      ]
    } as User

    const journal = {
      ...genericJournal,
      privilegeConditions: {
        ...genericJournal.privilegeConditions,
        canCreateArticle: { beenionRank: { min: 500 } }
      }
    } as Journal

    expect(rules.canCreateArticle(user, journal)).toBe(false)
  })

  it('should accept article commands - article owner', () => {
    const journal = {...genericJournal}

    const user = {
      ...genericUser,
      userId: 'test-user'
    } as User

    const article = {
      ...genericArticle,
      ownerId: 'test-user'
    } as Article

    expect(rules.canDeleteArticle(user, article, journal)).toBe(true)
    expect(rules.canUpdateArticle(user, article, journal)).toBe(true)
  })

  it('should permit resubmiting article', () => {
    const journal = {...genericJournal}

    const user = {
      ...genericUser,
      rankEvents: [
        {
          category: 'ReviewVotes',
          journalId: 'test-journal-id',
          eventType: 'ReviewUpvotedWithGold'
        }
      ]
    } as User

    const article = {
      ...genericArticle,
      reviewProcessCompleted: true,
      ownerId: user.userId
    } as Article

    expect(rules.canResubmitArticle(user, article, journal)).toBe(true)
  })

  it('should permit removing reviewer', () => {
    const article = {
      ...genericArticle
    }

    expect(rules.canRemoveReviewer(article.reviewers[0], article)).toBe(true)
  })

  it('should not permit removing reviewer', () => {
    const article = {...genericArticle}
    const userId = 'unlisted-uuid' as UserId

    expect(rules.canRemoveReviewer(userId, article)).toBe(false)
  })

  it('should permit promoting article', () => {
    const article = {
      ...genericArticle
    }

    expect(rules.canPromoteArticle(article)).toBe(true)
  })

  it('should not permit promoting article', () => {
    const article = {
      ...genericArticle,
      stageRules: [{
        ...genericArticle.stageRules[0],
        threshold: 5
      }]
    }

    expect(rules.canPromoteArticle(article)).toBe(false)
  })

  it('should permit approving article', () => {
    const article = {
      ...genericArticle,
      currentStage: 1,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'approve'
        }
      ]
    } as Article

    expect(rules.canApproveArticle(article)).toBe(true)
  })

  it('should not permit accepting article', () => {
    const article = {
      ...genericArticle,
      currentStage: 1,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'reject'
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'reject'
        }
      ]
    } as Article

    expect(rules.canApproveArticle(article)).toBe(false)
  })

  it('should permit rejecting article', () => {
    const article = {
      ...genericArticle,
      evaluations: [
        {
          reviewerId: 'test-user1-uuid',
          evaluation: 'approve'
        },
        {
          reviewerId: 'test-user2-uuid',
          evaluation: 'reject'
        },
        {
          reviewerId: 'test-user3-uuid',
          evaluation: 'reject'
        }
      ]
    } as Article

    expect(rules.canRejectArticle(article)).toBe(true)
  })
})

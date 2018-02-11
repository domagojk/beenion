const defaultNewsletterPermissions = {}
const requiredNewsletterEvents = [
  'NewsletterCreated',
  'NumberOfSubscribersDefined',
  'NewsletterMetadataDefined',
  'NewsletterPermissionsDefined',
  'NewsletterStagesDefined',
  'ProposalExpireTimeDefined'
]

export const useCases = [
  {
    description: 'newsletter commands by single owner',
    context: {
      owner1: {
        newsletterId: 'newsletter-test-1',
        userId: 'newsletter-owner-1'
      },
      owner2: {
        newsletterId: 'newsletter-test-1',
        userId: 'newsletter-owner-2'
      }
    },
    cases: [
      {
        context: 'owner1',
        command: 'CreateNewsletter',
        events: requiredNewsletterEvents
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterPermissions',
        params: {
          permissions: {
            ...defaultNewsletterPermissions,
            DefineNumberOfSubscribers: {
              roles: ['owner'],
              decision: 'single'
            },
            DefineNewsletterCategories: {
              roles: ['owner'],
              decision: 'single'
            },
            DefineNewsletterMetadata: {
              roles: ['owner'],
              decision: 'single'
            },
            DefineNewsletterStages: {
              roles: ['owner'],
              decision: 'single'
            }
          }
        },
        events: ['NewsletterPermissionsDefined']
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterMetadata',
        events: ['NewsletterMetadataDefined']
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        events: ['NewsletterCategoriesDefined']
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterStages',
        events: ['NewsletterStagesDefined']
      },
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerInvited']
      },
      {
        context: 'owner2',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      {
        context: 'owner1',
        command: 'DefineNumberOfSubscribers',
        events: ['NumberOfSubscribersDefined']
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        events: ['NewsletterCategoriesDefined']
      },
      {
        context: 'owner2',
        command: 'DefineNewsletterMetadata',
        events: ['NewsletterMetadataDefined']
      }
    ]
  },
  {
    description: '2 newsletter owners using majority decision',
    context: {
      owner1: {
        newsletterId: 'newsletter-test-2',
        userId: 'newsletter-owner-1'
      },
      owner2: {
        newsletterId: 'newsletter-test-2',
        userId: 'newsletter-owner-2'
      },
      processManager: {
        newsletterId: 'newsletter-test-2',
        userId: null,
        private: true
      }
    },
    cases: [
      // owner 1 crates newsleter and with default permissions
      {
        context: 'owner1',
        command: 'CreateNewsletter',
        events: requiredNewsletterEvents
      },
      // owner 2 is invited and confirmed
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerInvited']
      },
      {
        context: 'owner2',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      // newsletter metadata is proposed and accepted
      {
        context: 'owner1',
        command: 'DefineNewsletterMetadata',
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'approved'
        },
        events: ['ProposalRated', 'ProposalAccepted', 'NewsletterMetadataDefined']
      },
      // newsletter categories are proposed and locked
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        events: ['ProposalCreated']
      },
      {
        // permissions can't be changed if proposal is in progress
        context: 'owner1',
        command: 'DefineNewsletterPermissions',
        throws: 'PROPOSAL_IN_PROGRESS'
      },
      {
        context: 'owner2',
        command: 'DefineNewsletterCategories',
        throws: 'PROPOSAL_IN_PROGRESS'
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        throws: 'PROPOSAL_IN_PROGRESS'
      },
      {
        context: 'owner2',
        command: 'WithdrawProposal',
        params: {
          action: 'DefineNewsletterCategories'
        },
        throws: 'ACCESS_DENIED'
      },
      // proposal is withdrawn by owner 1 and created again
      {
        context: 'owner1',
        command: 'WithdrawProposal',
        params: {
          action: 'DefineNewsletterCategories'
        },
        events: ['ProposalWithdrawn']
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        events: ['ProposalCreated']
      },
      // voting time limit has exceeded and PM had resolved proposal
      // all non-voters (owner2) are resolved to neutral
      // since here majority wins, proposal is accepted
      {
        context: 'processManager',
        command: 'ResolveProposal',
        params: {
          action: 'DefineNewsletterCategories'
        },
        events: ['ProposalAccepted', 'NewsletterCategoriesDefined']
      },
      // prposal is again created and rejected by owner 2
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterCategories',
          decision: 'rejected'
        },
        events: ['ProposalRated', 'ProposalRejected']
      }
    ]
  },
  {
    description: '3 newsletter owners using majority decision',
    context: {
      owner1: {
        newsletterId: 'newsletter-test-3',
        userId: 'newsletter-owner-1'
      },
      owner2: {
        newsletterId: 'newsletter-test-3',
        userId: 'newsletter-owner-2'
      },
      owner3: {
        newsletterId: 'newsletter-test-3',
        userId: 'newsletter-owner-3'
      }
    },
    cases: [
      // owner 1 creates ns with default permissions
      {
        context: 'owner1',
        command: 'CreateNewsletter',
        events: requiredNewsletterEvents
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterPermissions',
        params: { permissions: defaultNewsletterPermissions },
        events: ['NewsletterPermissionsDefined']
      },
      // owner 2 is invited and confirmed
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerInvited']
      },
      {
        context: 'owner2',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      // owner 3 is invited, proposed and confirmed
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner3@email.com'
        },
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'InviteNewsletterOwner',
          decision: 'approved'
        },
        events: ['ProposalRated', 'NewsletterOwnerInvited']
      },
      {
        context: 'owner3',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner3@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      // category defintion is proposed, voted and confirmed (2 approved, 1 rejected)
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterCategories',
          decision: 'approved'
        },
        events: ['ProposalRated']
      },
      {
        context: 'owner3',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterCategories',
          decision: 'rejected'
        },
        events: ['ProposalRated', 'ProposalAccepted', 'NewsletterCategoriesDefined']
      },
      // newsletter stages are proposed, voted and rejected (1 approved, 2 rejected)
      {
        context: 'owner1',
        command: 'DefineNewsletterStages',
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterStages',
          decision: 'approved'
        },
        events: ['ProposalRated']
      },
      {
        context: 'owner3',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterStages',
          decision: 'rejected'
        },
        events: ['ProposalRated', 'ProposalRejected']
      },
      // newsletter metadata is proposed, voted and rejected (1 appeoved, 1 rejected, 1 neutral)
      {
        context: 'owner1',
        command: 'DefineNewsletterMetadata',
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'rejected'
        },
        events: ['ProposalRated']
      },
      {
        context: 'owner3',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterStages',
          decision: 'neutral'
        },
        events: ['ProposalRated', 'ProposalRejected']
      }
    ]
  },
  {
    description: '3 newsletter owners using unanimous decision',
    context: {
      owner1: {
        newsletterId: 'newsletter-test-4',
        userId: 'newsletter-owner-1'
      },
      owner2: {
        newsletterId: 'newsletter-test-4',
        userId: 'newsletter-owner-2'
      },
      owner3: {
        newsletterId: 'newsletter-test-4',
        userId: 'newsletter-owner-3'
      },
      processManager: {
        newsletterId: 'newsletter-test-2',
        userId: null,
        private: true
      }
    },
    cases: [
      // owner 1 creates ns with unanimous based permissions
      {
        context: 'owner1',
        command: 'CreateNewsletter',
        events: requiredNewsletterEvents
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterPermissions',
        params: {
          permissions: {
            ...defaultNewsletterPermissions,
            DefineNewsletterMetadata: {
              roles: ['owner'],
              decision: 'unanimous'
            }
          }
        },
        events: ['NewsletterPermissionsDefined']
      },
      // owner 2 is invited and confirmed
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerInvited']
      },
      {
        context: 'owner2',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      // owner 3 is invited, proposed and confirmed
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner3@email.com'
        },
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'InviteNewsletterOwner',
          decision: 'approved'
        },
        events: ['ProposalRated', 'NewsletterOwnerInvited']
      },
      {
        context: 'owner3',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner3@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      // DefineNewsletterMetadata is proposed, voted and rejected
      {
        context: 'owner1',
        command: 'DefineNewsletterMetadata',
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'approved'
        },
        events: ['ProposalRated']
      },
      // voting time limit has exceeded and PM had resolved proposal
      // all non-voters (owner2) are resolved to neutral
      // since here unanimous decidion wins, proposal is rejected
      {
        context: 'processManager',
        command: 'ResolveProposal',
        params: {
          action: 'DefineNewsletterMetadata'
        },
        events: ['ProposalRejected']
      },
      // DefineNewsletterMetadata is again proposed, voted and rejected
      {
        context: 'owner2',
        command: 'DefineNewsletterMetadata',
        events: ['ProposalCreated']
      },
      {
        context: 'owner1',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'approved'
        },
        events: ['ProposalRated']
      },
      {
        context: 'owner3',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'rejected'
        },
        events: ['ProposalRated', 'ProposalRejected']
      },
      // DefineNewsletterMetadata is again proposed, voted and approved
      {
        context: 'owner3',
        command: 'DefineNewsletterMetadata',
        events: ['ProposalCreated']
      },
      {
        context: 'owner1',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'approved'
        },
        events: ['ProposalRated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'approved'
        },
        events: ['ProposalRated', 'ProposalApproved', 'NewsletterMetadataDefined']
      }
    ]
  },
  {
    description: '3 newsletter owners, removing owner',
    context: {
      owner1: {
        newsletterId: 'newsletter-test-5',
        userId: 'newsletter-owner-1'
      },
      owner2: {
        newsletterId: 'newsletter-test-5',
        userId: 'newsletter-owner-2'
      },
      owner3: {
        newsletterId: 'newsletter-test-5',
        userId: 'newsletter-owner-3'
      }
    },
    cases: [
      // owner 1 creates ns with unanimous based permissions
      {
        context: 'owner1',
        command: 'CreateNewsletter',
        events: requiredNewsletterEvents
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterPermissions',
        params: {
          permissions: {
            ...defaultNewsletterPermissions,
            InviteNewsletterOwner: {
              roles: ['owner'],
              decision: 'unanimous'
            },
            RemoveNewsletterOwner: {
              roles: ['owner'],
              decision: 'unanimous'
            },
            DefineNewsletterCategories: {
              roles: ['owner'],
              decision: 'unanimous'
            },
            DefineNewsletterMetadata: {
              roles: ['owner'],
              decision: 'unanimous'
            }
          }
        },
        events: ['NewsletterPermissionsDefined']
      },
      // owner 2 is invited and confirmed
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerInvited']
      },
      {
        context: 'owner2',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner2@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      // owner 3 is invited, proposed and confirmed
      {
        context: 'owner1',
        command: 'InviteNewsletterOwner',
        params: {
          email: 'owner3@email.com'
        },
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'InviteNewsletterOwner',
          decision: 'approved'
        },
        events: ['ProposalRated', 'NewsletterOwnerInvited']
      },
      {
        context: 'owner3',
        command: 'ConfirmNewsletterOwnerInvitation',
        params: {
          email: 'owner3@email.com'
        },
        events: ['NewsletterOwnerAdded']
      },
      // owner3 suggest removing owner1
      // owner1 declines, owner 2 accpets
      // proposal is accepted
      {
        context: 'owner3',
        command: 'RemoveNewsletterOwner',
        params: {
          ownerId: 'newsletter-owner-1'
        },
        events: ['ProposalCreated']
      },
      {
        context: 'owner1',
        command: 'VoteOnProposal',
        params: {
          action: 'RemoveNewsletterOwner',
          decision: 'rejected'
        },
        events: ['ProposalRated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'RemoveNewsletterOwner',
          decision: 'approved'
        },
        events: ['ProposalRated', 'ProposalAccepted', 'NewsletterOwnerRemoved']
      },
      // new commands are decided between 2 owners
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        throws: 'ACCESS_DENIED'
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterCategories',
        events: ['ProposalCreated']
      },
      {
        context: 'owner2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterCategories',
          decision: 'approved'
        },
        events: ['ProposalRated', 'ProposalAccepted', 'NewsletterCategoriesDefined']
      },
      // owner2 removing itself
      {
        context: 'owner2',
        command: 'RemoveNewsletterOwner',
        params: {
          ownerId: 'newsletter-owner-2'
        },
        events: ['NewsletterOwnerRemoved']
      },
      // owner3 decides without proposals
      {
        context: 'owner2',
        command: 'DefineNewsletterCategories',
        throws: 'ACCESS_DENIED'
      },
      {
        context: 'owner3',
        command: 'DefineNewsletterCategories',
        events: ['NewsletterCategoriesDefined']
      }
    ]
  },
  {
    description: '1 newsletter owner, proposals among editors and subscribers',
    context: {
      owner1: {
        newsletterId: 'newsletter-test-6',
        userId: 'newsletter-owner-1'
      },
      subscriber1: {
        newsletterId: 'newsletter-test-6',
        userId: 'newsletter-subscriber-1'
      },
      subscriber2: {
        newsletterId: 'newsletter-test-6',
        userId: 'newsletter-subscriber-2'
      }
    },
    cases: [
      {
        context: 'owner1',
        command: 'CreateNewsletter',
        events: requiredNewsletterEvents
      },
      {
        context: 'owner1',
        command: 'DefineNewsletterPermissions',
        params: { permissions: defaultNewsletterPermissions },
        events: ['NewsletterPermissionsDefined']
      },
      {
        context: 'subscriber1',
        command: 'SubscribeToNewsletter',
        events: ['UserSubscribedToNewsletter']
      },
      {
        context: 'subscriber2',
        command: 'SubscribeToNewsletter',
        events: ['UserSubscribedToNewsletter']
      },
      {
        context: 'owner1',
        command: 'AddNewsletterEditor',
        params: {
          userId: 'newsletter-subscriber-999'
        },
        throws: 'SUBSCRIBER_NOT_FOUND'
      },
      {
        context: 'owner1',
        command: 'AddNewsletterEditor',
        params: {
          userId: 'newsletter-subscriber-1'
        },
        events: ['NewsletterEditorAdded']
      },
      // newsletter metadata is proposed and accepted
      {
        context: 'owner1',
        command: 'DefineNewsletterMetadata',
        events: ['ProposalCreated']
      },
      {
        context: 'subscriber2',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'approved'
        },
        throws: 'ACCESS_DENIED'
      },
      {
        context: 'subscriber1',
        command: 'VoteOnProposal',
        params: {
          action: 'DefineNewsletterMetadata',
          decision: 'approved'
        },
        events: ['ProposalRated', 'ProposalAccepted', 'NewsletterMetadataDefined']
      },
      // on unsubscribe editor is removed
      {
        context: 'subscriber1',
        command: 'UnsubscribeFromNewsletter',
        events: ['UserUnsubscribedFromNewsletter', 'NewsletterEditorRemoved']
      },
      {
        context: 'subscriber1',
        command: 'DefineNewsletterMetadata',
        throws: 'ACCESS_DENIED'
      }
    ]
  },
  {
    description: 'link reviews',
    context: {
      owner: {
        newsletterId: 'newsletter-test-7',
        userId: 'newsletter-owner-1'
      },
      user1: {
        newsletterId: 'newsletter-test-7',
        userId: 'newsletter-user-1'
      },
      user2: {
        newsletterId: 'newsletter-test-7',
        userId: 'newsletter-user-2'
      },
      user3: {
        newsletterId: 'newsletter-test-7',
        userId: 'newsletter-user-3'
      },
      user4: {
        newsletterId: 'newsletter-test-7',
        userId: 'newsletter-user-4'
      },
      user5: {
        newsletterId: 'newsletter-test-7',
        userId: 'newsletter-user-5'
      },
      processManager: {
        newsletterId: 'newsletter-test-2',
        userId: null,
        private: true
      }
    },
    cases: [
      {
        context: 'owner',
        command: 'CreateNewsletter',
        events: requiredNewsletterEvents
      },
      {
        context: 'owner',
        command: 'DefineNewsletterStages',
        params: {
          stages: [
            {
              role: ['subscriber', 'editor'],
              minSimilarity: 0,
              minSample: 0,
              maxReviewers: 3
            },
            {
              role: ['owner'],
              minSimilarity: 0,
              minSample: 0,
              maxReviewers: 1
            }
          ]
        },
        events: ['NewsletterStagesDefined']
      },
      {
        context: 'user1',
        command: 'SubmitLink',
        throws: 'ACCESS_DENIED'
      },
      {
        context: 'user1',
        command: 'SubscribeToNewsletter',
        events: ['UserSubscribedToNewsletter']
      },
      {
        context: 'user2',
        command: 'SubscribeToNewsletter',
        events: ['UserSubscribedToNewsletter']
      },
      {
        context: 'user3',
        command: 'SubscribeToNewsletter',
        events: ['UserSubscribedToNewsletter']
      },
      {
        context: 'user4',
        command: 'SubscribeToNewsletter',
        events: ['UserSubscribedToNewsletter']
      },
      {
        context: 'user1',
        command: 'SubmitLink',
        params: {
          linkId: 'link-1'
        },
        events: result => (
          result.length === 2 &&
          result[0].type === 'LinkSubmitted' &&
          result[1].type === 'LinkReviewersAdded' &&
          result[1].payload.reviewers.length === 3 &&
          result[1].payload.reviewers.includes('newsletter-user-2') &&
          result[1].payload.reviewers.includes('newsletter-user-3') &&
          result[1].payload.reviewers.includes('newsletter-user-4')
        )
      },
      // if unexisting link is reviewed, error is thrown
      {
        context: 'user2',
        command: 'ReviewLink',
        params: {
          linkId: 'link-99',
          review: 'approve'
        },
        throws: 'LINK_NOT_FOUND'
      },
      // if usassigned reviewer tries to review, error is thrown
      {
        context: 'user1',
        command: 'ReviewLink',
        params: {
          linkId: 'link-1',
          review: 'approve'
        },
        throws: 'ACCESS_DENIED'
      },
      // if usassigned reviewer tries to review, error is thrown (even when owner is reviewing)
      {
        context: 'owner',
        command: 'ReviewLink',
        params: {
          linkId: 'link-1',
          review: 'approve'
        },
        throws: 'ACCESS_DENIED'
      },
      // link is reviewed and approved
      {
        context: 'user2',
        command: 'ReviewLink',
        params: {
          linkId: 'link-1',
          review: 'approve'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user3',
        command: 'ReviewLink',
        params: {
          linkId: 'link-1',
          review: 'approve'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user4',
        command: 'ReviewLink',
        params: {
          linkId: 'link-1',
          review: 'reject'
        },
        events: ['LinkReviewed', 'LinkPromoted', 'LinkReviewersAdded']
      },
      {
        context: 'owner',
        command: 'ReviewLink',
        params: {
          linkId: 'link-1',
          review: 'approve'
        },
        events: ['LinkReviewed', 'LinkApproved']
      },
      {
        context: 'user2',
        params: {
          linkId: 'link-2'
        },
        command: 'SubmitLink',
        events: result => (
          result.length === 2 &&
          result[0].type === 'LinkSubmitted' &&
          result[1].type === 'LinkReviewersAdded' &&
          result[1].payload.reviewers.length === 3 &&
          result[1].payload.reviewers.includes('newsletter-user-1') &&
          result[1].payload.reviewers.includes('newsletter-user-3') &&
          result[1].payload.reviewers.includes('newsletter-user-4')
        )
      },
      // link is reviewed and rejected by reviewers
      {
        context: 'user1',
        command: 'ReviewLink',
        params: {
          linkId: 'link-2',
          review: 'neutral'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user3',
        command: 'ReviewLink',
        params: {
          linkId: 'link-2',
          review: 'reject'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user4',
        command: 'ReviewLink',
        params: {
          linkId: 'link-2',
          review: 'reject'
        },
        events: ['LinkReviewed', 'LinkRejected']
      },
      // link is reviewed and rejected by owner
      {
        context: 'user2',
        command: 'SubmitLink',
        params: {
          linkId: 'link-3'
        },
        events: result => (
          result.length === 2 &&
          result[0].type === 'LinkSubmitted' &&
          result[1].type === 'LinkReviewersAdded' &&
          result[1].payload.reviewers.length === 3 &&
          result[1].payload.reviewers.includes('newsletter-user-1') &&
          result[1].payload.reviewers.includes('newsletter-user-3') &&
          result[1].payload.reviewers.includes('newsletter-user-4')
        )
      },
      {
        context: 'user1',
        command: 'ReviewLink',
        params: {
          linkId: 'link-3',
          review: 'neutral'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user3',
        command: 'ReviewLink',
        params: {
          linkId: 'link-3',
          review: 'approve'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user4',
        command: 'ReviewLink',
        params: {
          linkId: 'link-3',
          review: 'approve'
        },
        events: ['LinkReviewed', 'LinkPromoted', 'LinkReviewersAdded']
      },
      // if reviewer wants now to review it, error is thrown
      {
        context: 'user3',
        command: 'ReviewLink',
        params: {
          linkId: 'link-3',
          review: 'approve'
        },
        throws: 'ACCESS_DENIED'
      },
      {
        context: 'owner',
        command: 'ReviewLink',
        params: {
          linkId: 'link-3',
          review: 'reject'
        },
        events: ['LinkReviewed', 'LinkRejected']
      },
      // subscriber has set unavaiable status
      {
        context: 'user3',
        command: 'ChangeAvailabilityStatus',
        params: {
          status: 'unavaiable'
        },
        events: ['UserChangedAvailabilityStatus']
      },
      // submited link is automatically promoted to owner
      // because there is not enough reviewers (< 3)
      {
        context: 'user2',
        command: 'SubmitLink',
        params: {
          linkId: 'link-4'
        },
        events: ['LinkSubmitted', 'LinkPromoted', 'LinkReviewersAdded']
      },
      {
        context: 'owner',
        command: 'ReviewLink',
        params: {
          linkId: 'link-4',
          review: 'reject'
        },
        events: ['LinkReviewed', 'LinkRejected']
      },
      {
        context: 'owner',
        command: 'ReviewLink',
        params: {
          linkId: 'link-4',
          review: 'approve'
        },
        events: ['LinkReviewed', 'LinkApproved']
      },
      // again all subscribers are avaiable for reviews
      // subscriber has set unavaiable status
      {
        context: 'user3',
        command: 'ChangeAvailabilityStatus',
        params: {
          status: 'avaiable'
        },
        events: ['UserChangedAvailabilityStatus']
      },
      // if time for review is exceeded, pm resolves it as neutral
      {
        context: 'user2',
        command: 'SubmitLink',
        params: {
          linkId: 'link-5'
        },
        events: result => (
          result.length === 2 &&
          result[0].type === 'LinkSubmitted' &&
          result[1].type === 'LinkReviewersAdded' &&
          result[1].payload.reviewers.length === 3 &&
          result[1].payload.reviewers.includes('newsletter-user-1') &&
          result[1].payload.reviewers.includes('newsletter-user-3') &&
          result[1].payload.reviewers.includes('newsletter-user-4')
        )
      },
      {
        context: 'user1',
        command: 'ReviewLink',
        params: {
          linkId: 'link-5',
          review: 'neutral'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user3',
        command: 'ReviewLink',
        params: {
          linkId: 'link-5',
          review: 'reject'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'processManager',
        command: 'ResolveReview',
        params: {
          linkId: 'link-5',
          review: 'neutral'
        },
        events: ['ReviewTimeExceeded', 'LinkRejected']
      },
      // if the review is not resolved (1 approve, 1 reject, 1 neutral) link is promoted
      {
        context: 'user2',
        command: 'SubmitLink',
        params: {
          linkId: 'link-6'
        },
        events: result => (
          result.length === 2 &&
          result[0].type === 'LinkSubmitted' &&
          result[1].type === 'LinkReviewersAdded' &&
          result[1].payload.reviewers.length === 3 &&
          result[1].payload.reviewers.includes('newsletter-user-1') &&
          result[1].payload.reviewers.includes('newsletter-user-3') &&
          result[1].payload.reviewers.includes('newsletter-user-4')
        )
      },
      {
        context: 'user1',
        command: 'ReviewLink',
        params: {
          linkId: 'link-6',
          review: 'neutral'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user3',
        command: 'ReviewLink',
        params: {
          linkId: 'link-6',
          review: 'reject'
        },
        events: ['LinkReviewed']
      },
      {
        context: 'user4',
        command: 'ReviewLink',
        params: {
          linkId: 'link-6',
          review: 'approve'
        },
        events: ['LinkReviewed', 'LinkPromoted', 'LinkReviewersAdded']
      },
      {
        context: 'owner',
        command: 'ReviewLink',
        params: {
          linkId: 'link-6',
          review: 'approve'
        },
        events: ['LinkReviewed', 'LinkApproved']
      },
      // owner sending its own links
      {
        context: 'owner',
        command: 'SubmitLink',
        params: {
          linkId: 'link-7'
        },
        events: ['LinkApproved']
      },
      // DeleteLink
      // ResubmitLink
      // BanLink
      // UnbanLink
      // link in 3rd stage, number of stages reduced to 2
      //    na promoted se uvijek izbroji koji je stage
      //    ako je rez 3, a ima sad 2 stagea
      //    3 > 2 - ide owneru
      // link in 2nd stage, number of stages increased to 4
      //    ako je rez 2, a ima 4 stagea
      //    ide na stage 3
    ]
  }
  // templates

  // create issue

  // comments
]

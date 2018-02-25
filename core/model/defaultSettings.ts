export const newsletter = {
  maxSubscribers: 500,
  permissions: {
    DefineNewsletterPermissions: {
      roles: ['owner'],
      decision: 'majority'
    },
    DefineNewsletterMetadata: {
      roles: ['owner', 'editor'],
      decision: 'majority'
    },
    DefineNewsletterCategories: {
      roles: ['owner', 'editor'],
      decision: 'majority'
    },
    DefineNewsletterStages: {
      roles: ['owner'],
      decision: 'majority'
    },
    AddNesletterOwner: {
      roles: ['owner'],
      decision: 'unanimous'
    },
    RemoveNesletterOwner: {
      roles: ['owner'],
      decision: 'majority'
    },
    AddNesletterEditor: {
      roles: ['owner'],
      decision: 'majority'
    },
    RemoveNesletterEditor: {
      roles: ['owner'],
      decision: 'majority'
    },
    PublishNewsletterIssue: {
      roles: ['owner'],
      decision: 'majority'
    },
    CancelSendingNewsletterIssue: {
      roles: ['owner'],
      decision: 'single'
    },
    DefineNumberOfSubscribers: {
      roles: ['owner'],
      decision: 'majority'
    },
    RateLinkReviewers: {
      roles: ['owner'],
      decision: 'single'
    },
    CreateNewsletterIssue: {
      roles: ['owner', 'editor'],
      decision: 'single'
    },
    UpdateNewsletterIssue: {
      roles: ['owner', 'editor'],
      decision: 'single'
    },
    SubmitLink: {
      roles: ['owner', 'editor', 'subscriber'],
      decision: 'single'
    },
    ApproveLink: {
      roles: ['owner'],
      decision: 'single'
    },
    RejectLink: {
      roles: ['owner'],
      decision: 'single'
    },
    BanLink: {
      roles: ['owner', 'editor'],
      decision: 'majority'
    },
    UnbanLink: {
      roles: ['owner', 'editor'],
      decision: 'majority'
    }
  }
}

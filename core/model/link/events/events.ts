import {
  NewsletterId,
  LinkId,
  UserId,
  Timestamp,
  Description,
  Title,
  NewsletterCategory,
  URL,
  Evaluation
} from '../index'

export type LinkEvent =
  | {
    type: 'LinkCreated'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkMetadataDefined'
    payload: {
      newsletterId: NewsletterId
      linkId: LinkId
      url: URL,
      title: Title
      description: Description
      img: URL
      category: NewsletterCategory
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkDeleted'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkPromoted'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkApproved'
    payload: {
      linkId: LinkId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkRejected'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkReviewed'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      reviewerId: UserId
      evaluation: Evaluation
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkBanned'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkUnbanned'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkResubmitted'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      userId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'ReviewTimeExceeded'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      reviewerId: UserId
      timestamp: Timestamp
    }
  }
  | {
    type: 'LinkReviewersAdded'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      reviewers: UserId[]
      timestamp: Timestamp
    }
  }
  | {
    type: 'ApprovedLinkRejected'
    payload: {
      linkId: LinkId
      newsletterId: NewsletterId
      userId: UserId
      timestamp: Timestamp
    }
  }

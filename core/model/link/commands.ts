import { type, literal } from 'io-ts'
import * as input from '../inputTypes'

export const systemCommands = type({
  ResolveReview: type({
    processManager: literal(true),
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      timestamp: input.Timestamp
    })
  })
})

export const userCommands = type({
  CreateLink: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      description: input.Description,
      url: input.URL,
      img: input.URL,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  DefineLinkMetadata: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      description: input.Description,
      url: input.URL,
      img: input.URL,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  DeleteLink: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      timestamp: input.Timestamp
    })
  }),

  ReviewLink: type({
    userId: input.UserId,
    payload: type({
      reviewerId: input.UserId,
      linkId: input.LinkId,
      evaluation: input.Evaluation,
      timestamp: input.Timestamp
    })
  }),

  BanLink: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      timestamp: input.Timestamp
    })
  }),

  UnbanLink: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      timestamp: input.Timestamp
    })
  }),

  RejectApprovedLink: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      timestamp: input.Timestamp
    })
  }),

  ResubmitLink: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      linkId: input.LinkId,
      timestamp: input.Timestamp
    })
  })
})

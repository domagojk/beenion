import { type, map } from 'io-ts'
import * as input from '../input'
import { UserEvent } from '../user/events'

export const privateCommands = null

export const publicCommands = type({
  CreateNewsletter: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      title: input.Title,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  AddNewsletterEditor: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      editorInfo: input.UserInfo,
      timestamp: input.Timestamp
    })
  }),

  ConfirmNewsletterEditor: type({
    payload: type({
      editorId: input.UserId,
      editorInfo: input.UserInfo,
      newsletterId: input.NewsletterId,
      timestamp: input.Timestamp
    })
  }),

  DefineNewsletterDescription: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      description: input.Description,
      timestamp: input.Timestamp
    })
  }),

  DefineNewsletterPrivilege: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      privilege: input.NewsletterPrivilege,
      permission: input.NewsletterPermission,
      timestamp: input.Timestamp
    })
  }),

  DefineNewsletterTitle: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      title: input.Title,
      timestamp: input.Timestamp
    })
  }),

  DefineRankCalcEvent: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      userEventType: map(t => t.type, UserEvent),
      factor: input.RankFactor,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  DefineRankCalcGroup: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      rankRange: input.RankRange,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  DefineStageRule: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      stage: input.Stage,
      stageRule: input.StageRule,
      timestamp: input.Timestamp
    })
  }),

  DeleteNewsletter: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      timestamp: input.Timestamp
    })
  }),

  RemoveNewsletterEditor: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      editorId: input.UserId,
      timestamp: input.Timestamp
    })
  }),

  RemoveNewsletterPermission: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      privilege: input.NewsletterPrivilege,
      timestamp: input.Timestamp
    })
  }),

  RemoveRankCalcEvent: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      userEventType: map(t => t.type, UserEvent),
      timestamp: input.Timestamp
    })
  }),

  RemoveRankCalcGroup: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  RemoveStageRule: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      stage: input.Stage,
      timestamp: input.Timestamp
    })
  })
})

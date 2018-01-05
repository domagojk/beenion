import { type } from 'io-ts'
import * as t from 'io-ts'
import * as input from '../input'
import { UserEvent } from '../user/events'

const pluck = <F extends string, U extends t.UnionType<Array<t.InterfaceType<{ [K in F]: t.Any }, any>>, any>>(
  union: U,
  field: F
): t.Type<any, t.TypeOf<U>[F]> => {
  return t.union(union.types.map(type => type.props[field]))
}

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

  DefineRankEvent: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      userEventType: pluck(UserEvent, 'type'),
      factor: input.RankFactor,
      group: input.RankGroup,
      timestamp: input.Timestamp
    })
  }),

  DefineRankGroup: type({
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

  RemoveRankEvent: type({
    userId: input.UserId,
    payload: type({
      newsletterId: input.NewsletterId,
      userEventType: pluck(UserEvent, 'type'),
      timestamp: input.Timestamp
    })
  }),

  RemoveRankGroup: type({
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

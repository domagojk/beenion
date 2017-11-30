import { PublicCommands, PickCommand } from '@beenionCore/domain/types'

type CommandFactory = {
  [Name in keyof PublicCommands]: (payload: PickCommand<Name>) => {
    name: Name
    payload: PickCommand<Name>
  }
}

export const createCommand: CommandFactory = {
  // article commands
  CreateArticle: payload => ({ name: 'CreateArticle', payload }),
  BanArticle: payload => ({ name: 'BanArticle', payload }),
  DeleteArticle: payload => ({ name: 'DeleteArticle', payload }),
  UnbanArticle: payload => ({ name: 'UnbanArticle', payload }),
  UpdateArticleDescription: payload => ({ name: 'UpdateArticleDescription', payload }),
  UpdateArticleLink: payload => ({ name: 'UpdateArticleLink', payload }),
  UpdateArticleTitle: payload => ({ name: 'UpdateArticleTitle', payload }),
  RejectApprovedArticle: payload => ({ name: 'RejectApprovedArticle', payload }),
  ResubmitArticle: payload => ({ name: 'ResubmitArticle', payload }),
  ReviewArticle: payload => ({ name: 'ReviewArticle', payload }),

  // journal commands
  CreateJournal: payload => ({ name: 'CreateJournal', payload }),
  AddJournalEditor: payload => ({ name: 'AddJournalEditor', payload }),
  ConfirmJournalEditor: payload => ({ name: 'ConfirmJournalEditor', payload }),
  DefineJournalDescription: payload => ({ name: 'DefineJournalDescription', payload }),
  DefineJournalPrivilege: payload => ({ name: 'DefineJournalPrivilege', payload }),
  DefineJournalTitle: payload => ({ name: 'DefineJournalTitle', payload }),
  DefineRankCalcEvent: payload => ({ name: 'DefineRankCalcEvent', payload }),
  DefineRankCalcGroup: payload => ({ name: 'DefineRankCalcGroup', payload }),
  DefineStageRule: payload => ({ name: 'DefineStageRule', payload }),
  DeleteJournal: payload => ({ name: 'DeleteJournal', payload }),
  RemoveJournalEditor: payload => ({ name: 'RemoveJournalEditor', payload }),
  RemoveJournalPermission: payload => ({ name: 'RemoveJournalPermission', payload }),
  RemoveRankCalcEvent: payload => ({ name: 'RemoveRankCalcEvent', payload }),
  RemoveRankCalcGroup: payload => ({ name: 'RemoveRankCalcGroup', payload }),
  RemoveStageRule: payload => ({ name: 'RemoveStageRule', payload }),

  // user commands
  DeclineReviewInvitation: payload => ({ name: 'DeclineReviewInvitation', payload }),
  ExpireReviewInvitation: payload => ({ name: 'ExpireReviewInvitation', payload }),
  RateArticle: payload => ({ name: 'RateArticle', payload }),
  RateReview: payload => ({ name: 'RateReview', payload }),
  RateUser: payload => ({ name: 'RateUser', payload }),
  WithdrawArticleVote: payload => ({ name: 'WithdrawArticleVote', payload }),
  WithdrawReviewVote: payload => ({ name: 'WithdrawReviewVote', payload }),
  WithdrawUserVote: payload => ({ name: 'WithdrawUserVote', payload })
}

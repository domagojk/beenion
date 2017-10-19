import { hasBeenionAccess, hasJournalAccess } from './permissions'
import beenionPrivilegeConditions from './beenionPrivilegeConditions'
import {
  Journal,
  Article,
  User,
  Medal,
  Stage,
  BeenionPermission,
  JournalPermission,
  UserId,
  ArticleId
} from './types/model'

export const canCreateJournal = (user: User) =>
  hasBeenionAccess(beenionPrivilegeConditions.canCreateJournal, user)

export const canUpdateJournal = (user: User, journal: Journal) =>
  hasJournalAccess(journal.privilegeConditions.canUpdateJournal, user, journal)

export const canDeleteJournal = (user: User, journal: Journal) =>
  hasJournalAccess(journal.privilegeConditions.canDeleteJournal, user, journal)

export const canAddJournalEditor = (editorId: UserId, user: User, journal: Journal) =>
  !journal.editors.invited.includes(editorId) &&
  !journal.editors.confirmed.includes(editorId) &&
  hasJournalAccess(journal.privilegeConditions.canUpdateEditor, user, journal)

export const canRemoveJournalEditor = (editorId: UserId, user: User, journal: Journal) =>
  hasJournalAccess(journal.privilegeConditions.canUpdateEditor, user, journal) &&
  (
    journal.editors.invited.includes(editorId) ||
    journal.editors.confirmed.includes(editorId)
  )

export const canConfirmJournalEditor = (editorId: UserId, journal: Journal) =>
  journal.editors.invited.includes(editorId) &&
  !journal.editors.confirmed.includes(editorId)

export const canUpdateJournalPrivilege = (user: User, journal: Journal) =>
  hasJournalAccess(journal.privilegeConditions.canUpdatePrivilege, user, journal)

export const canUpdateRankCalcParams = (user: User, journal: Journal) =>
  hasJournalAccess(journal.privilegeConditions.canUpdateRankCalcParams, user, journal)

export const canDefineStageRule = (user: User, journal: Journal, stage: Stage) =>
  stage <= (journal.stageRules.length) &&
  hasJournalAccess(journal.privilegeConditions.canUpdateStageRules, user, journal)

export const canRemoveStageRule = (user: User, journal: Journal, stage: Stage) =>
  journal.stageRules[stage] !== undefined &&
  journal.stageRules[stage + 1] === undefined &&
  hasJournalAccess(journal.privilegeConditions.canUpdateStageRules, user, journal)

export const canCreateArticle = (user: User, journal: Journal) =>
  hasJournalAccess(journal.privilegeConditions.canCreateArticle, user, journal)

export const canDeleteArticle = (user: User, article: Article, journal: Journal) =>
  article.ownerId === user.userId ||
  hasJournalAccess(journal.privilegeConditions.canDeleteArticle, user, journal)

export const canBanArticle = (user: User, article: Article, journal: Journal) =>
  article.banned === false &&
  hasJournalAccess(journal.privilegeConditions.canBanArticle, user, journal)

export const canUpdateArticle = (user: User, article: Article, journal: Journal) =>
  article.ownerId === user.userId ||
  hasJournalAccess(journal.privilegeConditions.canUpdateArticle, user, journal)

export const canAddReviewer = (reviewer: User, article: Article, journal: Journal) => {
  const rules = article.stageRules[article.currentStage]
  const priviligeName = `canReviewInStage${article.currentStage}`
  const privilege = journal.privilegeConditions[priviligeName]

  return (
    article.reviewers.length < rules.maxReviewers &&
    hasJournalAccess(privilege, reviewer, journal)
  )
}
export const canResubmitArticle = (user: User, article: Article, journal: Journal) =>
  article.banned === false &&
  article.approved === false &&
  article.reviewProcessCompleted &&
  article.ownerId === user.userId &&
  hasJournalAccess(journal.privilegeConditions.canResubmitArticle, user, journal)

export const canRemoveReviewer = (reviewerId: UserId, article: Article) =>
  article.reviewers.includes(reviewerId)

export const canReviewArticle = (reviewer: User, article: Article) =>
  article.banned === false && article.reviewers.includes(reviewer.userId)

export const canPromoteArticle = (article: Article) => {
  const currentStageRules = article.stageRules[article.currentStage]
  const approvedEvaluations =
    article.evaluations.filter(r => r.evaluation === 'approve')

  return (
    article.banned === false &&
    article.evaluations.length === article.reviewers.length &&
    approvedEvaluations.length >= currentStageRules.threshold
  )
}
export const canApproveArticle = (article: Article) =>
  canPromoteArticle(article) && article.currentStage === article.lastStage

export const canRejectArticle = (article: Article) => {
  const currentStageRules = article.stageRules[article.currentStage]
  const approvedEvaluations =
    article.evaluations.filter(r => r.evaluation === 'approve')

  return (
    !article.banned &&
    article.evaluations.length === article.reviewers.length &&
    approvedEvaluations.length < currentStageRules.threshold
  )
}
export const canRejectApprovedArticle = (user: User, article: Article, journal: Journal) =>
  article.approved &&
  hasJournalAccess(journal.privilegeConditions.canRejectApprovedArticle, user, journal)

export const canVoteInBeenion = (user: User, medal: Medal) => {
  type VotePrivilege = {
    [medal in Medal]: BeenionPermission
  }
  const privileges: VotePrivilege = {
    gold: beenionPrivilegeConditions.canVoteWithGold,
    silver: beenionPrivilegeConditions.canVoteWithSilver,
    bronze: beenionPrivilegeConditions.canVoteWithBronze
  }
  return hasBeenionAccess(privileges[medal], user)
}
export const canVoteInJournal = (user: User, journal: Journal, medal: Medal) => {
  type VotePrivilege = {
    [medal in Medal]: JournalPermission
  }
  const privileges: VotePrivilege = {
    gold: journal.privilegeConditions.canVoteWithGold,
    silver: journal.privilegeConditions.canVoteWithSilver,
    bronze: journal.privilegeConditions.canVoteWithBronze
  }
  return hasJournalAccess(privileges[medal], user, journal)
}
export const canRateArticle = (
  voter: User,
  articleOwner: User,
  articleId: ArticleId,
  journal: Journal,
  medal: Medal
) =>
  canVoteInJournal(voter, journal, medal) &&
  (
    articleOwner.rankEvents.filter(rankEvent =>
      rankEvent.category === 'ArticleVotes' &&
      rankEvent.articleId === articleId &&
      rankEvent.voterId === voter.userId
    ).length === 0
  )

export const canRateReview = (
  voter: User,
  reviewer: User,
  articleId: ArticleId,
  journal: Journal,
  medal: Medal
) =>
  canVoteInJournal(voter, journal, medal) &&
  (
    reviewer.rankEvents.filter(rankEvent =>
      rankEvent.category === 'ReviewVotes' &&
      rankEvent.articleId === articleId &&
      rankEvent.voterId === voter.userId
    ).length === 0
  )

export const canRateUser = (voter: User, user: User, medal: Medal) =>
  canVoteInBeenion(voter, medal) &&
  (
    user.rankEvents.filter(rankEvent =>
      rankEvent.category === 'UserEvents' &&
      rankEvent.voterId === voter.userId
    ).length === 0
  )

export const canWithdrawUserVote = (voter: User, user: User) =>
  user.rankEvents.filter(rankEvent =>
    rankEvent.category === 'UserEvents' &&
    rankEvent.voterId === voter.userId
  ).length !== 0

export const canWithdrawReviewVote = (
  voter: User,
  reviewer: User,
  articleId: ArticleId
) =>
  reviewer.rankEvents.filter(rankEvent =>
    rankEvent.category === 'ReviewVotes' &&
    rankEvent.articleId === articleId &&
    rankEvent.voterId === voter.userId
  ).length !== 0

export const canWithdrawArticleVote = (
  voter: User,
  articleOwner: User,
  articleId: ArticleId
) =>
  articleOwner.rankEvents.filter(rankEvent =>
    rankEvent.category === 'ArticleVotes' &&
    rankEvent.articleId === articleId &&
    rankEvent.voterId === voter.userId
  ).length !== 0

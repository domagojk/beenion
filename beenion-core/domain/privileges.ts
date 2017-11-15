import { hasBeenionPermissions, hasJournalPermissions } from './permissions'
import * as t from '../types'

type HasJournalPermissions = (user: t.User, journal: t.Journal) => boolean
type JournalPrivileges = Record<t.JournalPrivilege, HasJournalPermissions>

const journalPrivileges: JournalPrivileges = {
  canUpdateJournal: (u, j) => hasJournalPermissions(u, j, 'canUpdateJournal'),
  canUpdatePrivilege: (u, j) => hasJournalPermissions(u, j, 'canUpdatePrivilege'),
  canUpdateRankCalcParams: (u, j) => hasJournalPermissions(u, j, 'canUpdateRankCalcParams'),
  canUpdateStageRules: (u, j) => hasJournalPermissions(u, j, 'canUpdateStageRules'),
  canUpdateEditor: (u, j) => hasJournalPermissions(u, j, 'canUpdateEditor'),
  canDeleteJournal: (u, j) => hasJournalPermissions(u, j, 'canDeleteJournal'),
  canReviewInStage0: (u, j) => hasJournalPermissions(u, j, 'canReviewInStage0'),
  canReviewInStage1: (u, j) => hasJournalPermissions(u, j, 'canReviewInStage1'),
  canReviewInStage2: (u, j) => hasJournalPermissions(u, j, 'canReviewInStage2'),
  canReviewInStage3: (u, j) => hasJournalPermissions(u, j, 'canReviewInStage3'),
  canReviewInStage4: (u, j) => hasJournalPermissions(u, j, 'canReviewInStage4'),
  canCreateArticle: (u, j) => hasJournalPermissions(u, j, 'canCreateArticle'),
  canDeleteArticle: (u, j) => hasJournalPermissions(u, j, 'canDeleteArticle'),
  canRejectApprovedArticle: (u, j) => hasJournalPermissions(u, j, 'canRejectApprovedArticle'),
  canBanArticle: (u, j) => hasJournalPermissions(u, j, 'canBanArticle'),
  canUpdateArticle: (u, j) => hasJournalPermissions(u, j, 'canUpdateArticle'),
  canResubmitArticle: (u, j) => hasJournalPermissions(u, j, 'canResubmitArticle'),
  canRateReviewWithGold: (u, j) => hasJournalPermissions(u, j, 'canRateReviewWithGold'),
  canRateReviewWithSilver: (u, j) => hasJournalPermissions(u, j, 'canRateReviewWithSilver'),
  canRateReviewWithBronze: (u, j) => hasJournalPermissions(u, j, 'canRateReviewWithBronze'),
  canRateArticleWithGold: (u, j) => hasJournalPermissions(u, j, 'canRateArticleWithGold'),
  canRateArticleWithSilver: (u, j) => hasJournalPermissions(u, j, 'canRateArticleWithSilver'),
  canRateArticleWithBronze: (u, j) => hasJournalPermissions(u, j, 'canRateArticleWithBronze')
}

type HasBeenionPermissions = (user: t.User) => boolean
type BeenionPrivileges = Record<t.BeenionPrivilege, HasBeenionPermissions>

const beenionPrivileges: BeenionPrivileges = {
  canCreateJournal: user => hasBeenionPermissions('canCreateJournal', user),
  canDeleteJournal: user => hasBeenionPermissions('canDeleteJournal', user),
  canRateUserWithGold: user => hasBeenionPermissions('canRateUserWithGold', user),
  canRateUserWithSilver: user => hasBeenionPermissions('canRateUserWithSilver', user),
  canRateUserWithBronze: user => hasBeenionPermissions('canRateUserWithBronze', user)
}

export default {
  ...journalPrivileges,
  ...beenionPrivileges
}

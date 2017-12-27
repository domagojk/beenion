import { hasBeenionPermissions, hasNewsletterPermissions } from './permissions'
import * as t from './types'

type HasNewsletterPermissions = (user: t.User, newsletter: t.Newsletter) => boolean
type NewsletterPrivileges = Record<t.NewsletterPrivilege, HasNewsletterPermissions>

const newsletterPrivileges: NewsletterPrivileges = {
  canUpdateNewsletter: (u, j) => hasNewsletterPermissions(u, j, 'canUpdateNewsletter'),
  canUpdatePrivilege: (u, j) => hasNewsletterPermissions(u, j, 'canUpdatePrivilege'),
  canUpdateRankCalcParams: (u, j) => hasNewsletterPermissions(u, j, 'canUpdateRankCalcParams'),
  canUpdateStageRules: (u, j) => hasNewsletterPermissions(u, j, 'canUpdateStageRules'),
  canUpdateEditor: (u, j) => hasNewsletterPermissions(u, j, 'canUpdateEditor'),
  canDeleteNewsletter: (u, j) => hasNewsletterPermissions(u, j, 'canDeleteNewsletter'),
  canReviewInStage0: (u, j) => hasNewsletterPermissions(u, j, 'canReviewInStage0'),
  canReviewInStage1: (u, j) => hasNewsletterPermissions(u, j, 'canReviewInStage1'),
  canReviewInStage2: (u, j) => hasNewsletterPermissions(u, j, 'canReviewInStage2'),
  canReviewInStage3: (u, j) => hasNewsletterPermissions(u, j, 'canReviewInStage3'),
  canReviewInStage4: (u, j) => hasNewsletterPermissions(u, j, 'canReviewInStage4'),
  canCreateArticle: (u, j) => hasNewsletterPermissions(u, j, 'canCreateArticle'),
  canDeleteArticle: (u, j) => hasNewsletterPermissions(u, j, 'canDeleteArticle'),
  canRejectApprovedArticle: (u, j) => hasNewsletterPermissions(u, j, 'canRejectApprovedArticle'),
  canBanArticle: (u, j) => hasNewsletterPermissions(u, j, 'canBanArticle'),
  canUpdateArticle: (u, j) => hasNewsletterPermissions(u, j, 'canUpdateArticle'),
  canResubmitArticle: (u, j) => hasNewsletterPermissions(u, j, 'canResubmitArticle'),
  canRateReviewWithGold: (u, j) => hasNewsletterPermissions(u, j, 'canRateReviewWithGold'),
  canRateReviewWithSilver: (u, j) => hasNewsletterPermissions(u, j, 'canRateReviewWithSilver'),
  canRateReviewWithBronze: (u, j) => hasNewsletterPermissions(u, j, 'canRateReviewWithBronze'),
  canRateArticleWithGold: (u, j) => hasNewsletterPermissions(u, j, 'canRateArticleWithGold'),
  canRateArticleWithSilver: (u, j) => hasNewsletterPermissions(u, j, 'canRateArticleWithSilver'),
  canRateArticleWithBronze: (u, j) => hasNewsletterPermissions(u, j, 'canRateArticleWithBronze')
}

type HasBeenionPermissions = (user: t.User) => boolean
type BeenionPrivileges = Record<t.BeenionPrivilege, HasBeenionPermissions>

const beenionPrivileges: BeenionPrivileges = {
  canCreateNewsletter: user => hasBeenionPermissions('canCreateNewsletter', user),
  canDeleteNewsletter: user => hasBeenionPermissions('canDeleteNewsletter', user),
  canRateUserWithGold: user => hasBeenionPermissions('canRateUserWithGold', user),
  canRateUserWithSilver: user => hasBeenionPermissions('canRateUserWithSilver', user),
  canRateUserWithBronze: user => hasBeenionPermissions('canRateUserWithBronze', user)
}

export default {
  ...newsletterPrivileges,
  ...beenionPrivileges
}

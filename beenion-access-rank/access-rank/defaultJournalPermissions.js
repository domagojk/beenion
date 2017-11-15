const defaultJournalPermissions = {
  updateJournalRules: { globalRank: 5000, subRank: 1000 },
  updateJournalInfo: { globalRank: 1000, subRank: 5000 },
  addEditor: { subRank: 500 },
  removeEditor: { subRank: 500 },
  deleteJournal: { subRank: 5000 },
  reviewInStage0: { subRank: 0 },
  reviewInStage1: { subRank: 50 },
  reviewInStage2: { subRank: 100 },
  reviewInStage3: { subRank: 500 },
  reviewInStage4: { subRank: 1000 },
  createArticle: { subRank: 0 },
  deleteArticle: { subRank: 1000 },
  rejectApprovedArticle: { subRank: 1000 },
  banArticle: { subRank: 500 },
  updateArticle: { subRank: 500 },
  resubmitArticle: { subRank: 100 },
  rateReviewWithGold: { subRank: 500 },
  rateReviewWithSilver: { subRank: 100 },
  rateReviewWithBronze: { subRank: 10 },
  rateArticleWithGold: { subRank: 500 },
  rateArticleWithSilver: { subRank: 100 },
  rateArticleWithBronze: { subRank: 10 }
}

module.exports = defaultJournalPermissions

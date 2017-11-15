const defaultJournalRankWeights = {
  gold: {
    range: [-1000, 1000],
    weights: {
      ReviewUpvotedWithGold: 100,
      ReviewDownvotedWithGold: -100,
      ArticleUpvotedWithGold: 100,
      ArticleDownvotedWithGold: -100
    }
  },
  silver: {
    range: [-100, 100],
    weights: {
      ReviewUpvotedWithSilver: 10,
      ReviewDownvotedWithSilver: -10,
      ArticleUpvotedWithSilver: 10,
      ArticleDownvotedWithSilver: -10
    }
  },
  bronze: {
    range: [-100, 100],
    weights: {
      ReviewUpvotedWithBronze: 1,
      ReviewDownvotedWithBronze: -1,
      ArticleUpvotedWithBronze: 1,
      ArticleDownvotedWithBronze: -1
    }
  }
}

module.exports = defaultJournalRankWeights

const beenionRankWeights = {
  gold: {
    range: [-1000, 1000],
    weights: {
      UserUpvotedWithGold: 100,
      UserDownvotedWithGold: -100
    }
  },
  silver: {
    range: [-100, 100],
    weights: {
      UserUpvotedWithSilver: 10,
      UserDownvotedWithSilver: -10
    }
  },
  bronze: {
    range: [-100, 100],
    weights: {
      UserUpvotedWithSilver: 1,
      UserDownvotedWithSilver: -1
    }
  }
}

module.exports = beenionRankWeights

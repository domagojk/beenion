const string = val => typeof val === 'string'

const beenionEvents = {
  ReviewUpvotedWithGold: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ReviewUpvotedWithSilver: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ReviewUpvotedWithBronze: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ReviewDownvotedWithGold: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ReviewDownvotedWithSilver: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ReviewDownvotedWithBronze: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ArticleUpvotedWithGold: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ArticleUpvotedWithSilver: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ArticleUpvotedWithBronze: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ArticleDownvotedWithGold: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ArticleDownvotedWithSilver: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  ArticleDownvotedWithBronze: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string,
      articleId: string,
      journalId: string
    }
  },

  UserUpvotedWithGold: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string
    }
  },

  UserUpvotedWithSilver: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string
    }
  },

  UserUpvotedWithBronze: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string
    }
  },

  UserDownvotedWithGold: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string
    }
  },

  UserDownvotedWithSilver: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string
    }
  },

  UserDownvotedWithBronze: {
    canUndo: true,
    unique: true,
    payload: {
      voterId: string
    }
  }
}

module.exports = beenionEvents

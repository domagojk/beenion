const users = {
  test1: {
    id: 'test1',
    name: 'test'
  },
  test2: {
    id: 'test2',
    name: 'test 2'
  },
  test3: {
    id: 'test3',
    name: 'test 3'
  },
  test4: {
    id: 'test4',
    name: 'test 4'
  },
  test5: {
    id: 'test5',
    name: 'test 5'
  }

}

const journals = [
  {
    id: '1',
    name: 'first'
  },
  {
    id: '2',
    name: 'second',
    stageRules: [
      {
        maxReviewers: 3,
        threshold: 2,
        canReview: {
          reviewers: [
            {
              user: users.test1,
              invitation: {
                service: 'twitter',
                handle: '@twhandle',
                confirmed: false
              }
            }
          ]
        }
      }
    ]
  }
]

export const resolvers = {
  Query: {
    journal: (_obj, args) => {
      return journals.find(a => a.id === args.id)
    }
  },
  Mutation: {
    addArticle: (_root, args) => {
      const newArticle = { id: '', name: args.name }
      return newArticle
    }
  }
}

const userId1 = "user1-test-id-" + Date.now()
const articleId1 = "article1-test-id-" + Date.now()
const newsletterId1 = "newsletter1-test-id-" + Date.now()

const userId2 = "user2-test-id-" + Date.now()
const articleId2 = "article2-test-id-" + Date.now()
const newsletterId2 = "newsletter2-test-id-" + Date.now()

const timestamp = Date.now()

module.exports = {
  cmd: 'sls invoke local --debug dev',
  commands: [
    {
      userId: userId1,
      name: "CreateUser",
      payload: {
        timestamp
      }
    },
    {
      userId: userId1,
      name: "CreateNewsletter",
      payload: {
        newsletterId: newsletterId1,
        title: "first newsletter",
        description: "first newsletter desc",
        timestamp
      },
    },
    {
      userId: userId1,
      name: "CreateArticle",
      payload: {
        newsletterId: newsletterId1,
        articleId: articleId1,
        title: "first article",
        description: "first article desc",
        link: "https://github.com",
        timestamp
      },
    },
    {
      userId: userId2,
      name: "CreateUser",
      payload: {
        timestamp
      }
    },
    {
      userId: userId2,
      name: "CreateArticle",
      payload: {
        newsletterId: newsletterId1,
        articleId: articleId2,
        title: "second article",
        description: "second article desc",
        link: "https://google.com",
        timestamp
      },
    }
  ]
}

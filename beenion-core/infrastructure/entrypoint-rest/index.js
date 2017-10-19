import createArticle from 'api/article/createArticle'
import deleteArticle from 'api/article/deleteArticle'
import { getById, save } from 'infrastructure/eventstore/inMemory'

app.post('/article/create', async function (req, res) {
  try {
    const journalHistory = await getById(req.journalId)
    const userHistory = await getById(req.userId)

    const events = createArticle({
      journalHistory,
      userHistory,
      articleId: req.articleId,
      title: req.title,
      description: req.description,
      link: req.link,
      timestamp: Date.now()
    })

    await save({
      stream: req.articleId,
      events,
      expectedVersion: 0
    })

    res.send('article created!')
  } catch (e) {
    res.error(e)
  }
})

app.post('/article/delete', async function (req, res) {
  try {
    const articleHistory = await getById(req.articleId)
    const journalHistory = await getById(req.journalId)
    const userHistory = await getById(req.userId)

    const events = deleteArticle({
      articleHistory,
      journalHistory,
      userHistory,
      timestamp: Date.now()
    })

    await save({
      stream: req.articleId,
      events,
      expectedVersion: articleHistory.length
    })

    res.send('article deleted!')
  } catch (e) {
    res.error(e)
  }
})

import createProject from 'api/project/createProject'
import deleteProject from 'api/project/deleteProject'
import { getById, save } from 'infrastructure/eventstore/inMemory'

app.post('/project/create', async function (req, res) {
  try {
    const publicationHistory = await getById(req.publicationId)
    const userHistory = await getById(req.userId)

    const events = createProject({
      publicationHistory,
      userHistory,
      projectId: req.projectId,
      title: req.title,
      description: req.description,
      link: req.link,
      timestamp: Date.now()
    })

    await save({
      stream: req.projectId,
      events,
      expectedVersion: 0
    })

    res.send('project created!')
  } catch (e) {
    res.error(e)
  }
})

app.post('/project/delete', async function (req, res) {
  try {
    const projectHistory = await getById(req.projectId)
    const publicationHistory = await getById(req.publicationId)
    const userHistory = await getById(req.userId)

    const events = deleteProject({
      projectHistory,
      publicationHistory,
      userHistory,
      timestamp: Date.now()
    })

    await save({
      stream: req.projectId,
      events,
      expectedVersion: projectHistory.length
    })

    res.send('project deleted!')
  } catch (e) {
    res.error(e)
  }
})

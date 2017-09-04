import createProject from 'api/project/createProject'
import deleteProject from 'api/project/deleteProject'
import { eventsFromStream, save } from 'infrastructure/eventstore/inMemory'

app.post('/project/create', async function (req, res) {
  try {
    const publicationHistory = await eventsFromStream(req.publicationId)
    const userHistory = await eventsFromStream(req.userId)

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
    const projectHistory = await eventsFromStream(req.projectId)
    const publicationHistory = await eventsFromStream(req.publicationId)
    const userHistory = await eventsFromStream(req.userId)

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

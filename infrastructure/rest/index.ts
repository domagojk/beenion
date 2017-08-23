import createProject from 'application/project/createProject'
import deleteProject from 'application/project/deleteProject'
import { getFromStream, appendToStream } from 'infrastructure/eventstore/inMemory'
import makeMember from 'domain/projections/makeMember'
import makeProject from 'domain/projections/makeProject'
import makePublication from 'domain/projections/makePublication'

app.post('/project/create', async function (req, res) {
  try {
    const publicationHistory = await getFromStream(req.publicationId)
    const userHistory = await getFromStream(req.userId)

    const uncommitedEvents = createProject(
      makeMember(publicationHistory)(userHistory),
      makePublication(publicationHistory),
      req.projectId,
      req.title,
      req.description,
      req.link,
      Date.now()
    )

    appendToStream({
      events: uncommitedEvents,
      id: req.projectId,
      expectedVersion: 0
    })

    res.send('project created!')
  } catch (e) {
    res.error(e)
  }
})

app.post('/project/delete', async function (req, res) {
  try {
    const projectHistory = await getFromStream(req.projectId)
    const publicationHistory = await getFromStream(req.publicationId)
    const userHistory = await getFromStream(req.userId)

    const uncommitedEvents = deleteProject(
      makeMember(publicationHistory)(userHistory),
      makeProject(projectHistory),
      makePublication(publicationHistory),
      Date.now()
    )

    appendToStream({
      events: uncommitedEvents,
      id: req.projectId,
      expectedVersion: projectHistory.length
    })

    res.send('project created!')
  } catch (e) {
    res.error(e)
  }
})

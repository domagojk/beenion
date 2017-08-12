// draft - this is not fully implemented

import * as project from 'application/project'
import { getFromStream, appendToStream } from 'infrastructure/eventstore/inMemory'

app.post('/project/create', function (req, res) {
  getFromStream(req.publicationId)
  .then(publicationHistory =>
    project.create({
      publicationHistory,
      projectId: req.id,
      publicationId: req.publicationId,
      owner: req.userId,
      description: req.description,
      link: req.link,
      title: req.title,
      timestamp: Date.now()
    })
  )
  .then(appendToStream(req.publicationId))
  .then(() => res.send('project created!'))
  .catch(e => res.error(e))
})

app.post('/project/updateTitle', function (req, res) {
  promisify(
    project.updateTitle({
      projectId: req.id,
      title: req.title,
      timestamp: Date.now()
    })
  )
  .then(appendToStream(req.projectId))
  .then(() => res.send('ok'))
  .catch(e => res.error(e))
})

/*
// experimental concept of using roles
// for autorization

app.post('/project/updateLink', function (req, res) {
  getUserRole(token)
  then(userRole =>
    project.updateLink(
      {
        projectId: req.id,
        link: req.link,
        timestamp: Date.now()
      },
      userRole
    )
  )
  .then(appendToStream(req.projectId))
  .then(() => res.send('ok'))
  .catch(e => res.error(e))
})
*/

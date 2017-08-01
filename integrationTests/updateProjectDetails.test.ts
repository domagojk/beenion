import createPublication from 'application/useCases/createPublication'
import updatePublicationConditions from 'application/useCases/updatePublicationConditions'
import createProject from 'application/useCases/createProject'
import updateProjectDetails from 'application/useCases/updateProjectDetails'
import InMemoryPublicationRepository from 'infrastructure/repository/inMemoryPublicationRepository'
import InMemoryProjectRepository from 'infrastructure/repository/inMemoryProjectRepository'

it('updates project details', async function () {
  const publicationRepository = new InMemoryPublicationRepository()
  const projectRepository = new InMemoryProjectRepository()

  await createPublication(publicationRepository)(
    'test-publication-id',
    1,
    'test-publication-name',
    'test-publication-description',
    [
      {
        threshold: 3,
        specificReviewers: [1, 2, 3]
      }
    ]
  )

  await createProject(publicationRepository, projectRepository)(
    'test-project-id',
    'test-publication-id',
    1,
    'test-project-name',
    'test-description',
    'test-link'
  )

  await updateProjectDetails(projectRepository)(
    'test-project-id',
    'test-project-name-updated',
    'test-description-updated',
    'test-link-updated'
  )

  const events = await projectRepository.getEventsById('test-project-id')

  expect(events[1]).toMatchObject({
    projectId: 'test-project-id',
    name: 'test-project-name-updated',
    type: 'ProjectNameUpdated'
  })

  expect(events[2]).toMatchObject({
    projectId: 'test-project-id',
    description: 'test-description-updated',
    type: 'ProjectDescriptionUpdated'
  })

  expect(events[3]).toMatchObject({
    projectId: 'test-project-id',
    link: 'test-link-updated',
    type: 'ProjectLinkUpdated'
  })

})

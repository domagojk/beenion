import createProject from 'application/useCases/createProject'
import createPublication from 'application/useCases/createPublication'
import updatePublicationConditions from 'application/useCases/updatePublicationConditions'
import InMemoryProjectRepository from 'infrastructure/repository/inMemoryProjectRepository'
import InMemoryPublicationRepository from 'infrastructure/repository/inMemoryPublicationRepository'

it('creates project', async function () {
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

  const events = await projectRepository.getEventsById('test-project-id')

  expect(events[0]).toMatchObject({
    projectId: 'test-project-id',
    publicaitionId: 'test-publication-id',
    publicationConditions: [
      {
        specificReviewers: [1, 2, 3],
        threshold: 3
      }
    ],
    userId: 1,
    name: 'test-project-name',
    description: 'test-description',
    link: 'test-link',
    type: 'ProjectCreated'
  })
  expect(events.length).toBe(1)
  expect(typeof events[0].timestamp).toBe('number')
})

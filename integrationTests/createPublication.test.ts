import createPublication from 'application/useCases/createPublication'
import InMemoryPublicationRepository from 'infrastructure/repository/inMemoryPublicationRepository'

it('creates publication', async function () {
  const publicationRepository = new InMemoryPublicationRepository()

  await createPublication(publicationRepository)(
    'test',
    1,
    'test publication name',
    'test publication description',
    [
      {
        threshold: 3,
        specificReviewers: [1,2,3]
      }
    ]
  )

  const events = await publicationRepository.getEventsById('test')

  expect(events[0]).toMatchObject({
    publicationId: 'test',
    owner: 1,
    name: 'test publication name',
    description: 'test publication description',
    type: 'PublicationCreated'
  })
  expect(events.length).toBe(1)
  expect(typeof events[0].timestamp).toBe('number')
})

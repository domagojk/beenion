import createPublication from 'application/useCases/createPublication'
import updatePublicationConditions from 'application/useCases/updatePublicationConditions'
import InMemoryPublicationRepository from 'infrastructure/repository/inMemoryPublicationRepository'

it('updates publication conditions', async function() {
  const publicationRepository = new InMemoryPublicationRepository()

  await createPublication(publicationRepository)(
    'publication-id',
    1,
    'test publication name',
    'test publication description',
    [
      {
        threshold: 3,
        specificReviewers: [1, 2, 3]
      }
    ]
  )
  await updatePublicationConditions(publicationRepository)('publication-id', [
    {
      threshold: 2,
      specificReviewers: [4, 5, 6]
    }
  ])

  const events = await publicationRepository.getEventsById('publication-id')

  expect(events[1]).toMatchObject({
    publicationId: 'publication-id',
    conditions: [
      {
        threshold: 2,
        specificReviewers: [4, 5, 6]
      }
    ],
    type: 'PublicationConditionsUpdated'
  })

  expect(events.length).toBe(2)
  expect(typeof events[1].timestamp).toBe('number')
})

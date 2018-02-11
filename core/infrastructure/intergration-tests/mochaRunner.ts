import { expect } from 'chai'
import 'mocha'

const useCases = [
  {
    description: 'newsletter commands by single owner',
    context: {
      owner1: {
        newsletterId: 'newsletter-test-1',
        userId: 'newsletter-owner-1'
      }
    },
    cases: [
      {
        context: 'owner1',
        command: 'CreateNewsletter',
        events: ['NewsletterCreated', 'NewsletterPermissionsDefined', 'NewsletterStagesDefined']
      }
    ]
  }
]

describe('', () => {
  it('should return hello world', () => {
    
    // expect('Hello world!').to.equal('Hello world!')
  })
})

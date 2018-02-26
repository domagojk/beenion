import { expect } from 'chai'
import 'mocha'
import { newsletterApiFactory } from './newsletter'

describe('newsletter Api', () => {
  it('function should exists', () => {
    expect(!!newsletterApiFactory).to.equal(true)
  })
})

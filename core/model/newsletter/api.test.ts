import { expect } from 'chai'
import 'mocha'
import { newsletterApi } from './api'

describe('newsletter Api', () => {
  it('function should exists', () => {
    expect(!!newsletterApi).to.equal(true)
  })
})

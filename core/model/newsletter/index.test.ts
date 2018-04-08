import { expect } from 'chai'
import 'mocha'
import { newsletterApi, Newsletter } from './index'
import { makeSingleDocRepo } from '../../repositories/singleDoc/inMemory'
import { accessDenied } from '../errors'

const testUser1 = {
  userId: 'domagojk',
  email: 'domagoj.kriskovic@gmail.com',
  twitter: null
}
const testUser2 = {
  userId: 'someother',
  email: 'someother@email.com'
}

const newsletterDoc = makeSingleDocRepo<Newsletter>()
const api = newsletterApi(newsletterDoc)

describe('newsletter Api', () => {
  it('function should exists', () => {
    expect(!!api).to.equal(true)
  })

  it('should create newsletter', () => {
    const newsletterData = {
      id: 'first',
      title: 'first newsletter',
      description: 'first newsletter',
      categories: ['stuff'],
      maxSubscribers: 500,
      stages: [
        {
          threshold: 2,
          reviewers: 3,
          minReviews: 0,
          minSimilarityRank: 0
        }
      ]
    }
    return api.create(testUser1, newsletterData).then(res => {
      expect(res).to.deep.equal({
        ...newsletterData,
        editors: ['domagojk']
      })
    })
  })

  it('should get newsletter', () => {
    return api.get('first').then(res => {
      expect(res.title).to.equal('first newsletter')
    })
  })

  it('should update newsletter', () => {
    return api
      .update(testUser1, {
        id: 'first',
        description: 'new description'
      })
      .then(res => {
        expect(res.description).to.equal('new description')
        expect(res.title).to.equal('first newsletter')
      })
  })

  it('should throw access denied on updating newsletter', () => {
    return api
      .update(testUser2, {
        id: 'first',
        description: 'new description 2'
      })
      .then(() => {
        throw new Error('should fail')
      })
      .catch(err => {
        expect(err.message).to.equal(accessDenied().message)
      })
  })

  it('should throw access denied on deleting newsletter', () => {
    return api
      .del(testUser2, 'first')
      .then(() => {
        throw new Error('should fail')
      })
      .catch(err => {
        expect(err.message).to.equal(accessDenied().message)
      })
  })

  it('should delete newsletter', () => {
    return api
      .del(testUser1, 'first')
      .then(res => {
        expect(res.title).to.equal('first newsletter')
      })
  })

  it('it should not get deleted newsletter', () => {
    return api
      .get('first')
      .then(() => {
        throw new Error('should fail')
      })
      .catch(err => {
        expect(err.message).to.equal('document not found')
      })
  })
})

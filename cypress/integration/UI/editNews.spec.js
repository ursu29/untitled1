import { postEl } from '../../support/locators'
import { getFirstPosts } from '../../support/getData'

describe('Edit News', () => {
  let allData = {
    posts: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.setImgToken('manager')

    cy.visit('/feed')
    cy.post(getFirstPosts()).then(res => {
      const { posts } = res.body.data
      allData = { ...allData, posts }
    })
  })

  it('Load new posts', () => {
    cy.scrollTo('bottom')
    cy.get(postEl.loader).should('not.exist')
    cy.get(postEl.post).its('length').should('be.greaterThan', allData.posts.length)
  })
})

import { menuEl, postEl, devMenu, modalEl } from '../../support/locators'
import { getFirstPosts, getTags, setHeaders } from '../../support/getData'
import { postTitle, submitPost } from '../../support/complexLocators'

describe('Edit News', () => {
  const data = new Date().toLocaleTimeString()
  let allData = {
    posts: null,
    tags: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.visit('/')
    cy.post(getFirstPosts()).then(res => {
      const { posts } = res.body.data
      allData = { ...allData, posts }
    })
    cy.post(getTags()).then(res => {
      const { tags } = res.body.data
      allData = { ...allData, tags }
    })
    cy.addRole()
    cy.get(menuEl.item).contains('News').click()
  })

  it('Edit first post', () => {
    cy.get(postEl.posts).should('be.visible')
    const arr = ['Title image', 'Background image', 'Foreground image']
    cy.get(postEl.editPost).eq(1).click()
    cy.elementIsPresent(postEl.toggle).then(val => {
      if (val) {
        cy.getId('isPublic').click()
      }
    })

    cy.getId(postEl.annotation).should('not.be.visible')
    cy.get(devMenu.itemLabel).each(val => {
      expect(arr).not.includes(val.text())
    })
  })

  it('Save post changes', () => {
    cy.get(postEl.button).click()
    cy.get(modalEl.window).should('be.visible')
    cy.route2('/graphql', req => {
      req.headers = setHeaders()
    })
    cy.get(submitPost).click()
    postTitle(0).should('contain.text', data)
  })

  it('Load new posts', () => {
    cy.scrollTo('bottom')
    cy.get(postEl.loader).should('not.be.visible')
    cy.get(postEl.post).its('length').should('be.greaterThan', allData.posts.length)
  })
})

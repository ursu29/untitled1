import { menuEl, postEl, devMenu, modalEl, matrix } from '../../support/locators'
import { getFirstPosts } from '../../support/getData'
import { submitPost } from '../../support/complexLocators'

describe('Edit News', () => {
  const text = new Date().toLocaleTimeString()
  let allData = {
    posts: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.visit('/')
    cy.post(getFirstPosts()).then(res => {
      const { posts } = res.body.data
      allData = { ...allData, posts }
    })
    cy.addRole()
    cy.get(menuEl.item).contains('News').click()
    cy.setImgToken('manager')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Edit first post', () => {
    cy.checkImgToken('manager')
    cy.scrollTo('top')
    cy.get(postEl.posts).should('be.visible')
    cy.get(postEl.editPost).eq(1).should('be.visible')
    const arr = ['Title image', 'Background image', 'Foreground image']
    cy.get('.ant-btn-link').eq(0).click()
    cy.get(postEl.title).clear().type(text)

    cy.getId(postEl.annotation).should('not.exist')
    cy.get(devMenu.itemLabel).each(val => expect(arr).not.includes(val.text()))
  })

  it('Save post', () => {
    cy.checkImgToken('manager')
    cy.scrollTo('bottom')
    cy.get(postEl.button).should('exist')
    cy.get(postEl.button).click({ force: true })
    cy.get(modalEl.window).should('be.visible')

    cy.intercept('/graphql', req => {
      if (req.body.operationName.includes('updatePost')) {
        // set superUser role
        req.headers['dev-only-user-role'] = 'superUser'
      }
      // create alias if call getPost
      if (req.body.operationName.includes('getPost')) {
        req.alias = 'getPost'
      }
    })
    cy.get(submitPost).click()
    cy.get(matrix.alert).should('not.exist')
    // call alias when get response
    cy.wait('@getPost').then(req => {
      const { data } = req.response.body
      const firstPost = data.post

      expect(firstPost.title).to.equal(text)
    })
  })

  it('Load new posts', () => {
    cy.checkImgToken('manager')
    cy.scrollTo('bottom')
    cy.get(postEl.loader).should('not.exist')
    cy.get(postEl.post).its('length').should('be.greaterThan', allData.posts.length)
  })
})

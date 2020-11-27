import { getTags } from '../../support/getData'
import { inputTag, submitPost } from '../../support/complexLocators'
import { matrix, postEl, modalEl } from '../../support/locators'

describe('Create news', () => {
  const text = new Date().toLocaleTimeString()
  let allData = {
    tags: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.setImgToken('manager')
    cy.visit('/')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Visit post page', () => {
    // sometimes instead manager login employee
    cy.setToken('manager')

    cy.post(getTags()).then(res => {
      const { tags } = res.body.data
      allData = { ...allData, tags }
    })
    cy.visit('/client/feed')
    cy.addRole()
  })

  it('Create new post', () => {
    cy.get(postEl.posts).should('be.visible')
    cy.get(postEl.editPost).eq(0).click()
    cy.get(postEl.title).type(text)
  })

  it('Check tags', () => {
    const allTags = allData.tags.map(el => el.name)
    const firstTag = allTags[0]

    cy.get(postEl.writePost).type(text)
    cy.get(postEl.button).scrollIntoView()

    cy.get(inputTag).click()
    cy.get(matrix.item).eq(0).click({ force: true })
    cy.get(postEl.delete).should('be.visible')
    cy.toEqualText(postEl.editTag, firstTag)
  })

  it('Save post', () => {
    cy.get(postEl.button).click()
    cy.get(modalEl.window).should('be.visible')

    cy.intercept('/graphql', req => {
      if (req.body.operationName.includes('createPost')) {
        // set superUser role
        req.headers['dev-only-user-role'] = 'superUser'
      }
      // create alias if call getPosts
      if (req.body.operationName.includes('getPosts')) {
        req.alias = 'getPost'
      }
    })
    cy.get(submitPost).click()
    // call alias when get response
    cy.wait('@getPost').then(req => {
      const { data } = req.response.body
      const firstPost = data.posts[0]

      expect(firstPost.title).to.equal(text)
      // delete created post
      cy.request('DELETE', `https://portal.dev.sidenis.com/posts/${firstPost.id}`)
    })
  })
})

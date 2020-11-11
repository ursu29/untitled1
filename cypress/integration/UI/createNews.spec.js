import { setHeaders, getFirstPosts, getTags } from '../../support/getData'
import { inputTag, postTitle, submitPost } from '../../support/complexLocators'
import { matrix, postEl, modalEl } from '../../support/locators'

describe('Create news', () => {
  const data = new Date().toLocaleTimeString()
  let allData = {
    posts: null,
    tags: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.post(getFirstPosts()).then(res => {
      const { posts } = res.body.data
      allData = { ...allData, posts }
    })
    cy.post(getTags()).then(res => {
      const { tags } = res.body.data
      allData = { ...allData, tags }
    })
    cy.visit('/client/feed')
    cy.addRole()
  })

  beforeEach(() => {
    cy.setImgToken()
  })

  it('Create new post', () => {
    cy.get(postEl.posts).should('be.visible')
    cy.get(postEl.editPost).eq(0).click()
    cy.get(postEl.title).clear().type(data)
  })

  it('Check tags', () => {
    const allTags = allData.tags.map(el => el.name)
    const firstTag = allTags[0]

    cy.get(postEl.title).clear().type(data)
    cy.get(postEl.writePost).type(data)
    cy.get(postEl.button).scrollIntoView()

    cy.get(inputTag).click()
    cy.checkTextInArrayEl(matrix.item, allTags, false)
    cy.get(matrix.item).eq(0).click()
    cy.get(postEl.delete).should('be.visible')
    cy.toEqualText(postEl.editTag, firstTag)
  })

  it('Save post', () => {
    cy.get(postEl.button).click()
    cy.get(modalEl.window).should('be.visible')
    cy.route2('/graphql', req => {
      req.headers = setHeaders()
    })
    cy.get(submitPost).click()
    cy.get(matrix.alert).should('not.be.visible')
  })

  it('Check first news items', () => {
    postTitle(0).should('contain.text', data)
    const firstPost = allData.posts[0]

    cy.elementIsPresent(postEl.tag).then(val => {
      if (val) {
        cy.checkTextInArrayEl(
          postEl.tag,
          firstPost.tags.map(val => val.name),
          false,
        )
      }
    })
  })
})

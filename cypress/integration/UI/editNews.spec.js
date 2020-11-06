import { menuEl, postEl } from '../../support/locators'
import { getFirstPosts, getTags, setHeaders } from '../../support/getData'
import { postTitle } from '../../support/complexLocators'

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

    cy.getId('postAnnotation').should('not.be.visible')
    cy.get('.ant-form-item-label').each(val => {
      expect(arr).not.includes(val.text())
    })
  })

  it('Check tags', () => {
    const firstPost = allData.posts[0]

    cy.get('#title').clear().type(data)
    cy.get(postEl.button).scrollIntoView()

    cy.elementIsPresent(postEl.editTag).then(val => {
      if (val) {
        cy.checkTextInArrayEl(
          '.ant-select-selection-item',
          firstPost.tags.map(val => val.name),
          false,
        )
      }
    })
  })

  it('Save post changes', () => {
    cy.get(postEl.button).click()
    cy.get('.ant-modal').should('be.visible')
    cy.route2('/graphql', req => {
      req.headers = setHeaders()
    })
    cy.get('.ant-modal-footer > .ant-btn-primary').click()
    postTitle(0).should('contain.text', data)
  })

  it('Load new posts', () => {
    cy.scrollTo('bottom')
    cy.get(postEl.loader).should('not.be.visible')
    cy.get(postEl.post).its('length').should('be.greaterThan', allData.posts.length)
  })
})

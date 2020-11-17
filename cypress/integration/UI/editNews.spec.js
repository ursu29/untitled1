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

  it('Edit first post', () => {
    cy.checkImgToken('manager')
    cy.get(postEl.posts).should('be.visible')
    const arr = ['Title image', 'Background image', 'Foreground image']
    cy.get(postEl.editPost).eq(1).click()
    cy.get(postEl.title).clear().type(text)

    cy.getId(postEl.annotation).should('not.be.visible')
    cy.get(devMenu.itemLabel).each(val => {
      expect(arr).not.includes(val.text())
    })
  })

  it('Save post', () => {
    cy.checkImgToken('manager')
    cy.get(postEl.button).click()
    cy.get(modalEl.window).should('be.visible')

    cy.route2('/graphql', req => {
      if (req.body.includes('updatePost')) {
        // set superUser role
        req.headers['dev-only-user-role'] = 'superUser'
      }
      // create alias if call getPost
      if (req.body.includes('getPost')) {
        req.alias = 'getPost'
      }
    })
    cy.get(submitPost).click()
    cy.get(matrix.alert).should('not.be.visible')
    // call alias when get response
    cy.wait('@getPost').then(req => {
      const { data } = JSON.parse(req.response.body)
      const firstPost = data.post

      expect(firstPost.title).to.equal(text)
    })
  })

  it('Load new posts', () => {
    cy.checkImgToken('manager')
    cy.scrollTo('bottom')
    cy.get(postEl.loader).should('not.be.visible')
    cy.get(postEl.post).its('length').should('be.greaterThan', allData.posts.length)
  })
})

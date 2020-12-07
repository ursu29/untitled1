import { menuEl, postEl, devMenu } from '../../support/locators'
import { getFirstPosts } from '../../support/getData'

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
    cy.scrollTo('top')
    cy.get(postEl.posts).should('be.visible')
    cy.get(postEl.editPost).eq(1).should('be.visible')
    const arr = ['Title image', 'Background image', 'Foreground image']
    cy.get('.ant-btn-link').eq(0).click()
    cy.get(postEl.title).clear().type(text)

    cy.getId(postEl.annotation).should('not.exist')
    cy.get(devMenu.itemLabel).each(val => expect(arr).not.includes(val.text()))
    cy.get('.anticon-close').eq(0).click()
    cy.get('.ant-drawer-open').should('not.exist')
  })

  it('Load new posts', () => {
    cy.scrollTo('bottom')
    cy.get(postEl.loader).should('not.exist')
    cy.get(postEl.post).its('length').should('be.greaterThan', allData.posts.length)
  })
})

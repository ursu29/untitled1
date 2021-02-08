import { getTags } from '../../support/getData'
import { inputTag } from '../../support/complexLocators'
import { matrix, postEl } from '../../support/locators'

describe('Check news tags', () => {
  const text = new Date().toLocaleTimeString()
  let allData = {
    tags: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.visit('/feed')

    cy.addRole()
    cy.setImgToken('manager')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Visit post page', () => {
    cy.post(getTags()).then(res => {
      const { tags } = res.body.data
      allData = { ...allData, tags }
    })
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
    cy.scrollTo('bottom')

    cy.get(inputTag).click()
    cy.get(matrix.item).eq(0).click({ force: true })
    cy.get(postEl.delete).should('be.visible')
    cy.toEqualText(postEl.editTag, firstTag)
  })
})

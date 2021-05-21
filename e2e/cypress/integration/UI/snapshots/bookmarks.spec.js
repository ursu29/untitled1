import { bookmarks } from '../../../fixtures/bookmarks'
import { getCommunityTabUrl } from '../../../support/utils'

describe('bookmark looks good', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.visit(getCommunityTabUrl('bookmarks'))
    cy.mockResponse(['getBookmarks'], bookmarks())
  })
  it('check bookmarks', () => {
    cy.getElement('bookmarks').should('be.visible')
    cy.get('.ant-tabs-content-top').last().matchImageSnapshot('bookmarks')
  })
  // don't use it now
  xit('check bookmarks menu', () => {
    cy.getElement('bookmarks').should('be.visible')
    cy.get('.ant-tabs-nav').last().matchImageSnapshot('userMenu')
  })
})

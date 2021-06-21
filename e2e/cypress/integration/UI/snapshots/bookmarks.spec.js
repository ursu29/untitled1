import { bookmarks } from '../../../fixtures/bookmarks'
import {getTabUrl} from '../../../support/utils'

describe('bookmark looks good', () => {
  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.mockResponse(['getBookmarks'], bookmarks())
    cy.visit(getTabUrl('bookmarks'))
  })
  it('check bookmarks', () => {
    cy.getElement('bookmarks').should('be.visible')
    cy.get('.ant-tabs-content-top').last().matchImageSnapshot('bookmarks')
  })

  it('check bookmarks menu', () => {
    cy.getElement('bookmarks').should('be.visible')
    cy.get('.ant-tabs-nav').last().matchImageSnapshot('userMenu')
  })
})

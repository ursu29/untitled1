import { matrixEl } from '../../../support/client/matrices'
import { checkElementsInArray } from '../../../support/utils'

describe('Check bookmarks', () => {
  let response

  before(() => {
    cy.setToken('employee')

    cy.getResponse(['getBookmarks'], 'alias')
    cy.visit('/guilds/Community-Frontend/bookmarks')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  it('Check bookmarks data', () => {
    cy.get('.ant-tabs-tab').eq(1).should('have.class', 'ant-tabs-tab-active')

    const { bookmarks } = response

    if (bookmarks.length) {
      // false to write
      bookmarks.map(el => el.access.write).forEach(el => expect(el).equal(false))
      checkElementsInArray(bookmarks, '__typename', 'Bookmark')
      checkElementsInArray(bookmarks, 'likedByMe', false)

      // check first title
      const { title, link } = bookmarks[0]

      cy.get(matrixEl.link)
        .eq(0)
        .should('have.attr', 'href')
        .then(href => {
          debugger
          expect(href).equal(link)
        })

      cy.get(matrixEl.link)
        .eq(0)
        .then(el => expect(el.text()).equal(title))
    }
  })
})

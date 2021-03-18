import { matrixEl } from '../../../support/client/matrices'
import { checkElementsInArray, checkTwoString } from '../../../support/utils'
import {getAllSkills, getBookmarks, updateGuild} from '../../../support/getData'
import { query } from '../../../fixtures/query'

describe('Check bookmarks', () => {
  const name = 'community-frontend' // tags skills
  let response
  let request

  before(() => {
    cy.setToken('manager')
    cy.post(getAllSkills()).then(res => {
      const {skills} = res.body.data
      const {id} = skills[0]

      cy.post(updateGuild(name, [id]), 'superUser')
    })


    cy.getResponse(['getBookmarks'], 'alias')
    cy.visit('/guilds/community-frontend/bookmarks')
    cy.wait(`@alias`).then(req => {
      request = req.request.body
      response = req.response.body.data
    })
  })

  it('check request body', () => {
    checkTwoString(query.getBookmarks, request.query)
    expect(request.operationName).equal(getBookmarks().operationName)
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
        .then(href => expect(href).equal(link))

      cy.get(matrixEl.link)
        .eq(0)
        .then(el => expect(el.text()).equal(title))
    }
  })
})

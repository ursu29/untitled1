import { createBookmark, deleteBookmark, getBookmarks, getEmployee } from '../../support/getData'
import { email } from '../../support/client/employeeData'
import { bookmark, bookmarkAccess } from '../../support/client/userMenu'
import { checkKeyValueExist } from '../../support/complexLocators'
import { randomValues } from '../../support/knowledge/bookmark'
import {checkTwoString, getTabUrl} from '../../support/utils'
import { query } from '../../fixtures/query'

describe(`Check employee getBookmarks`, () => {
  let bookmarkId
  let response
  let employeeData
  let request

  const { link, skills, title } = randomValues

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { data } = res.body

      employeeData = { ...data.employeeByEmail }
    })
    cy.post(createBookmark(title, link, skills)).then(res => {
      const { data } = res.body
      const { __typename, id } = data.createBookmark
      bookmarkId = id

      expect(__typename).equal('Bookmark')
    })

    cy.getResponse(['getBookmarks'], 'alias')
    cy.visit(getTabUrl('bookmarks'))

    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('getBookmarks response', () => {
    checkTwoString(query.getBookmarks, request.query)
    expect(request.operationName).equal(getBookmarks().operationName)

    const { email, id, name, __typename } = employeeData
    const { bookmarks } = response

    expect(bookmarks).to.be.a('array')

    cy.compareObjectsKeys(bookmarks[0], bookmark)
    bookmarks.forEach(el => {
      expect(el.access).to.deep.equal(bookmarkAccess)
      expect(el.likes).to.be.a('array')
      expect(el.skills).to.be.a('array')
      // employee data is present
      checkKeyValueExist(el.employee, { email, id, name, __typename })
    })

    cy.post(deleteBookmark(bookmarkId))
  })
})

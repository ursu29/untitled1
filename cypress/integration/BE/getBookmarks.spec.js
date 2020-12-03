import { getEmployee } from '../../support/getData'
import { email, employeeData } from '../../support/client/employeeData'
import { bookmark, bookmarkAccess } from '../../support/client/userMenu'
import { checkKeyValueExist } from '../../support/complexLocators'

describe(`Check employee getBookmarks`, () => {
  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { data } = res.body

      employeeData.employee = { ...data.employeeByEmail }
    })
  })

  it('getBookmarks response', () => {
    const { email, id, name, __typename } = employeeData.employee

    cy.getResponse(['getBookmarks'], 'alias')
    cy.visit('/profile/bookmarks')

    cy.wait(`@alias`).then(val => {
      const { bookmarks } = val.response.body.data

      expect(bookmarks).to.be.a('array')
      cy.compareObjectsKeys(bookmarks[0], bookmark)

      bookmarks.forEach(el => {
        expect(el.access).to.deep.equal(bookmarkAccess)
        expect(el.likes).to.be.a('array')
        expect(el.skills).to.be.a('array')
        // employee data is present
        checkKeyValueExist(el.employee, { email, id, name, __typename })
      })
    })
  })
})

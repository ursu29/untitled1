import { randomValues } from '../../support/knowledge/bookmark'
import {createBookmark, deleteBookmark, getAllBookmarksId, getEmployee} from '../../support/getData'
import {email} from '../../support/client/employeeData'

describe('Check all bookmarks after delete one', () => {
  const { link, skills, title } = randomValues
  let getId
  let employeeEmail

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data
      employeeEmail = employeeByEmail.email
    })
  })

  it('create bookmark', () => {
    cy.post(createBookmark(title, link, skills)).then(res => {
      const { data } = res.body
      const { id } = data.createBookmark
      getId = id
    })
  })

  it('delete bookmark', () => {
    cy.post(deleteBookmark(getId)).then(res => {
      const { data } = res.body
      const { __typename } = data.deleteBookmark

      expect(__typename).equal('Bookmark')
    })
  })

  it('bookmark does not exist', () => {
    cy.post(getAllBookmarksId(employeeEmail)).then(res => {
      const { bookmarks } = res.body.data

      expect(bookmarks.map(el => el.id)).not.includes(getId)
    })
  })
})

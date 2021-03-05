import {
  createBookmark,
  deleteBookmark,
  getAllSkills,
  getBookmarks, getEmployee,
  toggleBookmarklike,
} from '../../support/getData'
import { randomValues, bookmarkResponse } from '../../support/knowledge/bookmark'
import { checkKeyValueExist } from '../../support/complexLocators'
import {email} from '../../support/client/employeeData'

describe('Check knowledge page', () => {
  let employeeData
  let createdBookmark
  let bookmarkId
  let skillName
  let skillId

  const { link, title } = randomValues

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => employeeData = res.body.data.employeeByEmail)
    cy.post(getAllSkills()).then(res => {
      const { skills } = res.body.data
      const {id, name} = skills[0]
      skillName = name
      skillId = id

      cy.post(createBookmark(title, link, id)).then(res => {
        const { id } = res.body.data.createBookmark
        bookmarkId = id
      })
    })
    cy.post(getBookmarks()).then(res => {
      const { bookmarks } = res.body.data
      createdBookmark = bookmarks.filter(el => el.id === bookmarkId)[0]
    })
  })

  it('new bookmark added', () => expect(createdBookmark.id).equal(bookmarkId))

  it('check access', () => {
    const { access } = createdBookmark

    expect(access).to.deep.equal({ read: true, write: true, __typename: 'Access' })
  })

  it('check main fields', () => {
    const { id, linkedByMe, link, title, __typename, likes } = createdBookmark

    expect(likes.length).equal(0)
    checkKeyValueExist(bookmarkResponse(bookmarkId, false, randomValues.link, randomValues.title), {
      id,
      linkedByMe,
      link,
      title,
      __typename,
    })
  })

  it('check skills', () => {
    const { skills } = createdBookmark

    checkKeyValueExist(skills[0], {
      id: skillId,
      name: skillName,
      __typename: 'Skill',
    })
  })
  it('check likes', () => expect(createdBookmark.likes.length).equal(0))
  it('check employee', () => {
    const { email, id, name, __typename } = employeeData

    checkKeyValueExist(createdBookmark.employee, { email, id, name, __typename })
  })

  it('check thumbs up', () => {
    cy.post(toggleBookmarklike(bookmarkId)).then(res => {
      const { data } = res.body
      const { __typename } = data.toggleBookmarklike

      expect(__typename).equal('Bookmarklike')
      cy.post(deleteBookmark(bookmarkId))
    })
  })
})

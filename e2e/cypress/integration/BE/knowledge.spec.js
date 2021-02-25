import {
  createBookmark,
  deleteBookmark,
  getBookmarks,
  toggleBookmarklike,
} from '../../support/getData'
import { randomValues, bookmarkResponse } from '../../support/knowledge/bookmark'
import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeData } from '../../support/client/employeeData'

describe('Check knowledge page', () => {
  const { link, skills, title } = randomValues
  let createdBookmark
  let getId

  before(() => {
    cy.setToken('employee')

    cy.post(createBookmark(title, link, skills)).then(res => {
      const { id } = res.body.data.createBookmark
      getId = id
    })
    cy.post(getBookmarks()).then(res => {
      const { bookmarks } = res.body.data
      createdBookmark = bookmarks.filter(el => el.id === getId)[0]
    })
  })

  it('new bookmark added', () => expect(createdBookmark.id).equal(getId))

  it('check access', () => {
    const { access } = createdBookmark

    expect(access).to.deep.equal({ read: true, write: true, __typename: 'Access' })
  })

  it('check main fields', () => {
    const { id, linkedByMe, link, title, __typename, likes } = createdBookmark

    expect(likes.length).equal(0)
    checkKeyValueExist(bookmarkResponse(getId, false, randomValues.link, randomValues.title), {
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
      id: randomValues.skills[0],
      name: 'Agile',
      __typename: 'Skill',
    })
  })
  it('check likes', () => expect(createdBookmark.likes.length).equal(0))
  it('check employee', () => {
    const { email, id, name, __typename } = employeeData.employee

    checkKeyValueExist(createdBookmark.employee, { email, id, name, __typename })
  })

  it('check thumbs up', () => {
    cy.post(toggleBookmarklike(getId)).then(res => {
      const { data } = res.body
      const { __typename } = data.toggleBookmarklike

      expect(__typename).equal('Bookmarklike')
    })
  })

  it('delete bookmark', () => {
    cy.post(deleteBookmark(getId)).then(req => {
      expect(req.body.data.deleteBookmark.id).equal(getId)
    })
  })
})

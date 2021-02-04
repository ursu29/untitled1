import { createBookmark, deleteBookmark, toggleBookmarklike } from '../../support/getData'
import { defaultValues, bookmarkResponse } from '../../support/knowledge/bookmark'
import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeData } from '../../support/client/employeeData'

describe('Check knowledge page', () => {
  const { link, skills, title } = defaultValues
  let response
  let getId

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')
  })

  it('add bookmark', () => {
    cy.post(createBookmark(title, link, skills)).then(res => {
      const { data } = res.body
      const { id, __typename } = data.createBookmark

      expect(__typename).equal('Bookmark')
      getId = id
    })
  })

  context('Check all bookmarks', () => {
    let createdBookmark

    before(() => {
      cy.setToken('employee')
      cy.getResponse(['getBookmarks'], 'alias')
      cy.visit('/knowledge')
      cy.wait(`@alias`).then(req => {
        response = req.response.body.data
        createdBookmark = response.bookmarks.filter(el => el.id === getId)[0]
      })
    })

    it('new bookmark added', () => {
      expect(response.bookmarks.map(el => el.id)).includes(getId)
    })

    it('check access', () => {
      const { access } = createdBookmark

      expect(access).to.deep.equal({ read: true, write: true, __typename: 'Access' })
    })

    it('check main fields', () => {
      const { id, linkedByMe, link, title, __typename, likes } = createdBookmark

      expect(likes.length).equal(0)
      checkKeyValueExist(bookmarkResponse(getId, false, defaultValues.link, defaultValues.title), {
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
        id: defaultValues.skills[0],
        name: 'React',
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
      cy.post(deleteBookmark(getId)).then(res => {
        const { data } = res.body
        const { __typename } = data.deleteBookmark

        expect(__typename).equal('Bookmark')
      })
    })
  })

  context('Check all bookmarks after delete one', () => {
    before(() => {
      cy.setToken('employee')
      cy.getResponse(['getBookmarks'], 'alias')
      cy.visit('/knowledge')
      cy.wait(`@alias`).then(req => (response = req.response.body.data))
    })

    it('bookmark does not exist', () => {
      expect(response.bookmarks.map(el => el.id)).not.includes(getId)
    })
  })
})

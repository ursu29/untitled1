import { getTags } from '../../support/getData'
import { inputTag, submitPost } from '../../support/complexLocators'
import { matrix, postEl, modalEl } from '../../support/locators'

describe('Create news', () => {
  const text = new Date().toLocaleTimeString()
  let allData = {
    tags: null,
  }

  before(() => {
    cy.setToken('manager')
    cy.visit('/')
    cy.setImgToken('manager')
  })

  beforeEach(() => {
    cy.setImgToken('manager')
  })

  it('Visit post page', () => {
    console.log('TEST', process.env.REACT_APP_AZURE_CLIENT)
    cy.log('TEST', process.env.REACT_APP_AZURE_CLIENT)

    if (!localStorage.getItem('img_token')) {
      cy.setImgToken('manager')
    }
    cy.post(getTags()).then(res => {
      const { tags } = res.body.data
      allData = { ...allData, tags }
    })
    cy.visit('/client/feed')
    cy.addRole()
  })

  it('Create new post', () => {
    if (!localStorage.getItem('img_token')) {
      cy.setImgToken('manager')
    }
    cy.get(postEl.posts).should('be.visible')
    cy.get(postEl.editPost).eq(0).click()
    cy.get(postEl.title).type(text)
  })

  it('Check tags', () => {
    if (!localStorage.getItem('img_token')) {
      cy.setImgToken('manager')
    }
    const allTags = allData.tags.map(el => el.name)
    const firstTag = allTags[0]

    cy.get(postEl.writePost).type(text)
    cy.get(postEl.button).scrollIntoView()

    cy.get(inputTag).click()
    cy.checkTextInArrayEl(matrix.item, allTags, false)
    cy.get(matrix.item).eq(0).click()
    cy.get(postEl.delete).should('be.visible')
    cy.toEqualText(postEl.editTag, firstTag)
  })

  it('Save post', () => {
    if (!localStorage.getItem('img_token')) {
      cy.setImgToken('manager')
    }
    cy.get(postEl.button).click()
    cy.get(modalEl.window).should('be.visible')

    cy.route2('/graphql', req => {
      if (req.body.includes('createPost')) {
        // set superUser role
        req.headers['dev-only-user-role'] = 'superUser'
      }
      // create alias if call getPosts
      if (req.body.includes('getPosts')) {
        req.alias = 'getPost'
      }
    })
    cy.get(submitPost).click()
    // call alias when get response
    cy.wait('@getPost').then(req => {
      const { data } = JSON.parse(req.response.body)
      const firstPost = data.posts[0]

      expect(firstPost.title).to.equal(text)
      expect(firstPost.tags[0].name).to.equal('New Year')
      // delete created post
      cy.request('DELETE', `https://portal.dev.sidenis.com/posts/${firstPost.id}`)
    })
  })
})

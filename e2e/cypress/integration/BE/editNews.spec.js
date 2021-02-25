import { updatePost, getFirstPosts } from '../../support/getData'
import { checkTwoString } from '../../support/utils'
import { query } from '../../fixtures/query'

describe('Edit news', () => {
  let response
  let request
  const text = new Date().toLocaleTimeString()

  before(() => {
    cy.setToken('manager')
    cy.setImgToken('manager')
    cy.getResponse(['getPosts'], 'alias')
    cy.visit('/feed')
    cy.wait(`@alias`).then(req => {
      response = req.response.body.data
      request = req.request.body
    })
  })

  it('Edit first post', () => {
    checkTwoString(query.getFirstPost, request.query)
    expect(request.operationName).equal(getFirstPosts().operationName)

    const firstNews = response.posts[0]

    cy.post(updatePost(text, firstNews.id, text), 'superUser').then(req => {
      const { updatePost } = req.body.data

      expect(updatePost.id).equal(firstNews.id)
      expect(updatePost.__typename).equal('Post')
    })
    cy.post(getFirstPosts()).then(res => {
      const { posts } = res.body.data
      const firstPost = posts[0]

      expect(text).equal(firstPost.title)
      expect(firstPost.tags.length).equal(2)
    })
  })
})

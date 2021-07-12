import { createHobbyPost, getHobbyPosts } from '../../../support/getData'

const allHobbyObj = {
  hobbies: [],
  language: null,
  search: ""
}
const newPost = {
  body: "test hobby",
  hobbies: [],
  language: "RU",
  title: "new hobby"
}

describe('successfully create new hobbies post', () => {
  let allPosts

  before(() => {
    cy.setToken('employee')
    cy.post(getHobbyPosts(allHobbyObj)).then(req => allPosts = req.body.data.hobbyPosts)
  })

  it('post created successfully', () => {
    cy.post(createHobbyPost(newPost)).then(req => {

      const {createHobbyPost} = req.body.data
      const {body, language, title} = createHobbyPost

      expect(body).equal(newPost.body)
      expect(language).equal(newPost.language)
      expect(title).equal(newPost.title)
    })
  })

  it('count all posts increased by one', () => {
    cy.post(getHobbyPosts(allHobbyObj)).then(req => expect(req.body.data.hobbyPosts.length)
      .to.be.greaterThan(allPosts.length))
  })

})
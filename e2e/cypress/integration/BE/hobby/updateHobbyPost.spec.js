import { getHobbyPosts, updateHobbyPost } from '../../../support/getData'
import { todaysDate } from '../../../support/officePlanner/officeDays'

const updatePost = (id) => ({
  body: todaysDate,
  hobbies: [],
  id,
  language: "RU",
  title: 'title data'
})

const allHobbyObj = {
  hobbies: [],
  language: null,
  search: ""
}

describe('successfully create new hobbies post', () => {
  let firstPost

  before(() => {
    cy.setToken('employee')
    cy.post(getHobbyPosts(allHobbyObj)).then(req => firstPost = req.body.data.hobbyPosts[0])
  })

  it('update post successfully', () => {
    cy.post(updateHobbyPost(updatePost(firstPost.id))).then(req => {

      const { updateHobbyPost } = req.body.data
      const { body, language, title } = updateHobbyPost
      const {body: BODY,language: LANGUAGE, title: TITLE } = updatePost(firstPost.id)

      expect(body).equal(BODY)
      expect(language).equal(LANGUAGE)
      expect(title).equal(TITLE)
    })
  })
})
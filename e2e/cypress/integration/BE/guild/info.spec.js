import { postEl } from '../../../support/locators'
import { checkTwoString } from '../../../support/utils'
import { query } from '../../../fixtures/query'

describe('Check Info data', () => {
  let response
  let request

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.getResponse(['getGuild'], 'alias')
    cy.visit('/guilds/community-frontend/info')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('Check guild technologies', () => {
    checkTwoString(query.getGuild, request.query)
    expect(request.operationName).equal('getGuild')

    cy.get('.ant-tabs-tab').eq(0).should('have.class', 'ant-tabs-tab-active')

    const { accessWrite, skills, __typename } = response.guild
    const allSkills = skills.map(el => el.name)

    expect(accessWrite).equal(false) // if employee
    expect(__typename).equal('Guild')

    if (skills.length) {
      cy.get(postEl.mainTag).each((el, idx) => expect(el.text()).contains(allSkills[idx]))
    }
  })
})

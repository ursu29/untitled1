import { postEl } from '../../../support/locators'

describe('Check Info data', () => {
  let response

  before(() => {
    cy.setToken('employee')

    cy.getResponse(['getGuild'], 'alias')
    cy.visit('/guilds/Community-Frontend/info')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })
  it('Check guild technologies', () => {
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

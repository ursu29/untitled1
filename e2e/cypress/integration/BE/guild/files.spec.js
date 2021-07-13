import {checkTwoString, getTabUrl} from '../../../support/utils'
import { query } from '../../../fixtures/query'
import {getAllSkills, updateGuild} from "../../../support/getData";

describe('Check files', () => {
  let response
  let request

  before(() => {
    cy.setToken('manager')
    cy.post(getAllSkills()).then(res => {
      const {skills} = res.body.data
      const {id} = skills.filter(el => el.name === 'Frontend')[0]

      cy.post(updateGuild('community-frontend', [id]), 'superUser')
    })

    cy.getResponse(['sharedFiles'], 'alias')
    cy.visit(getTabUrl('files', '/guilds/community-frontend'))
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('Check files data', () => {
    checkTwoString(query.sharedFiles, request.query)
    expect(request.operationName).equal('sharedFiles')

    cy.get('.ant-tabs-tab').eq(2).should('have.class', 'ant-tabs-tab-active')
    const files = response.sharedFiles[0]

    expect(files.__typename).equal('SharedFile')
  })
})

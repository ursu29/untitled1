import {checkTwoString} from "../../../support/utils";
import {query} from "../../../fixtures/query";

describe('Check files', () => {
  let response
  let request

  before(() => {
    cy.setToken('employee')

    cy.getResponse(['sharedFiles'], 'alias')
    cy.visit('/guilds/Community-Frontend/files')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('check request body', () => {
    checkTwoString(query.sharedFiles, request.query)
    expect(request.operationName).equal('sharedFiles')
  })

  it('Check files data', () => {
    cy.get('.ant-tabs-tab').eq(3).should('have.class', 'ant-tabs-tab-active')

    const { sharedFiles } = response

    expect(sharedFiles.__typename).equal('SharedFiles')
  })
})

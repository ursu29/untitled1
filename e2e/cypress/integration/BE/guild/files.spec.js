import { checkTwoString, getCommunityTabUrl } from '../../../support/utils'
import { query } from '../../../fixtures/query'

describe('Check files', () => {
  let response
  let request

  before(() => {
    cy.setToken('employee')

    cy.getResponse(['sharedFiles'], 'alias')
    cy.visit(getCommunityTabUrl('files'))
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
    cy.get('.ant-tabs-tab').eq(2).should('have.class', 'ant-tabs-tab-active')

    const files = response.sharedFiles[0]

    expect(files.__typename).equal('SharedFile')
  })
})

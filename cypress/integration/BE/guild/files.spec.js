describe('Check files', () => {
  let response

  before(() => {
    cy.setToken('employee')

    cy.getResponse(['sharedFiles'], 'alias')
    cy.visit('/guilds/Community-Frontend/files')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  it('Check files data', () => {
    cy.get('.ant-tabs-tab').eq(3).should('have.class', 'ant-tabs-tab-active')

    const { sharedFiles } = response

    expect(sharedFiles.__typename).equal('SharedFiles')
  })
})

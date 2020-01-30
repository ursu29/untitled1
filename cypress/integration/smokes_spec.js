describe('Smokes employee', () => {
  beforeEach(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMWJmOTMxZGYtMjAxNS00NTE2LWFjMzMtMGQyY2FkZGM3ZGYyIiwibmFtZSI6IlRlc3QgRW1wbG95ZWUiLCJlbWFpbCI6InRlc3QuZW1wbG95ZWVAc2lkZW5pcy5jb20ifSwiYXNzZXJ0aW9uIjoiUEVGemMyVnlkR2x2YmlCSlJEMGlYMlUwWkdObU16VTNMVGxtTlRBdE5EUmtZUzA1Wm1ZMExUZGlaRE0xTW1Oa016TXdNU0lnU1hOemRXVkpibk4wWVc1MFBTSXlNREl3TFRBeExUTXdWREV4T2pBeU9qUTRMamMxTVZvaUlGWmxjbk5wYjI0OUlqSXVNQ0lnZUcxc2JuTTlJblZ5YmpwdllYTnBjenB1WVcxbGN6cDBZenBUUVUxTU9qSXVNRHBoYzNObGNuUnBiMjRpUGp3dlFYTnpaWEowYVc5dVBnPT0iLCJpYXQiOjE1ODAzODIxNzB9.mhQ65B8TW1B8OIIBkBR5RyvSH49kbbwCtzcpipQIkUo',
    )
  })
  it('Opens profile by default', () => {
    cy.visit('/')
    cy.url().should('include', '/client/profile')
    cy.contains('Test Employee')
  })

  it('Profile include info and link to manager page', () => {
    cy.visit('/')
    cy.contains('Test Manager').click({ force: true })
    cy.url().should('include', '/client/employees/test.manager@sidenis.com/')
    cy.contains('Test Manager')
  })

  it('Employee can see own private tabs', () => {
    cy.visit('/client/profile')
    cy.wait(3000)
    cy.get('[role=tab]').contains('Matrices')
    cy.get('[role=tab]').contains('Personal development')
    cy.get('[role=tab]').contains('Self Evaluation Form')
  })
  it('Employee cannot see manager private tabs', () => {
    cy.visit('/client/employees/test.manager@sidenis.com/')
    cy.wait(3000)
    cy.get('[role=tab]').contains('Bookmarks')
    cy.get('[role=tab]')
      .contains('Matrices')
      .should('not.exist')
  })
})

describe('Smokes manager', () => {
  beforeEach(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzUyMzVlNTQtNTc3Ni00NjFkLThlYjUtMmZkNjRkMWVhYzBkIiwibmFtZSI6IlRlc3QgTWFuYWdlciIsImVtYWlsIjoidGVzdC5tYW5hZ2VyQHNpZGVuaXMuY29tIn0sImFzc2VydGlvbiI6IlBFRnpjMlZ5ZEdsdmJpQkpSRDBpWDJaaE16azBOREU1TFRoaVpXWXROR00yWlMwNU1qSmhMV0V5WkdFMU5USm1OV013TVNJZ1NYTnpkV1ZKYm5OMFlXNTBQU0l5TURJd0xUQXhMVE13VkRFeE9qQXpPalExTGpNNE5Wb2lJRlpsY25OcGIyNDlJakl1TUNJZ2VHMXNibk05SW5WeWJqcHZZWE5wY3pwdVlXMWxjenAwWXpwVFFVMU1Pakl1TURwaGMzTmxjblJwYjI0aVBqd3ZRWE56WlhKMGFXOXVQZz09IiwiaWF0IjoxNTgwMzgyMjI1fQ.KKmJsJ4R9ZC8Wy5ASj-lbWVWWtGBHiCtDTFBaXv6flY',
    )
  })
  it('Opens profile by default', () => {
    cy.visit('/')
    cy.url().should('include', '/client/profile')
    cy.contains('Test Manager')
  })
  it('Manager can see own private tabs', () => {
    cy.visit('/client/profile')
    cy.wait(3000)
    cy.get('[role=tab]').contains('Matrices')
    cy.get('[role=tab]').contains('Personal development')
    cy.get('[role=tab]').contains('Self Evaluation Form')
  })
  it('Employee can see employee private tabs', () => {
    cy.visit('/client/employees/test.employee@sidenis.com/')
    cy.wait(3000)
    cy.get('[role=tab]').contains('Bookmarks')
    cy.get('[role=tab]').contains('Matrices')
  })
})

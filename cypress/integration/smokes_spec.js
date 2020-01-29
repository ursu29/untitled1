describe('Smokes employee', () => {
  beforeEach(() => {
    localStorage.setItem('token', '')
  })
  it('Opens profile by default', () => {
    cy.visit('/')
    cy.url().should('include', '/client/profile')
    cy.contains('Alexey Avdeev')
    cy.contains('Middle Frontend Developer')
  })

  it('Profile include info and link to manager page', () => {
    cy.visit('/')
    cy.contains('Anton Laletin').click({ force: true })
    cy.url().should('include', '/client/employees/Anton.Laletin@sidenis.com/')
    cy.contains('Senior Java Developer')
  })

  it('Employee can see own private tabs', () => {
    cy.visit('/client/profile')
    cy.wait(2000)
    cy.get('[role=tab]').contains('Matrices')
    cy.get('[role=tab]').contains('Personal development')
    cy.get('[role=tab]').contains('Self Evaluation Form')
  })
  it('Employee cannot see manager private tabs', () => {
    cy.visit('/client/employees/Anton.Laletin@sidenis.com/')
    cy.wait(2000)
    cy.get('[role=tab]').contains('Bookmarks')
    cy.get('[role=tab]')
      .contains('Matrices')
      .should('not.exist')
  })
})

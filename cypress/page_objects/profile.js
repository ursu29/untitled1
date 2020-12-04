class Profile {
  url() {
    return cy.url()
  }

  visit() {
    cy.visit('/', { timeout: 20000 })
  }

  //Block with employee basic information
  avatar() {
    return cy.get('.ant-card-meta-avatar > .ant-avatar')
  }

  name() {
    return cy.get('.ant-card-meta-title > div > .ant-typography')
  }

  jobTitle() {
    return cy.get('.ant-card-meta-description > * > :nth-child(1)')
  }

  city() {
    return cy.get('.ant-card-meta-description > * > :nth-child(2)')
  }

  //Block with manager
  managerHeader() {
    return cy.get('.ant-col-lg-10 > * .ant-typography')
  }

  managerAvatar() {
    return cy.get('a > .ant-card > * > .ant-card-meta-avatar > .ant-avatar')
  }

  managerName() {
    return cy.get('a > .ant-card > * .ant-card-meta-detail > .ant-card-meta-title')
  }

  managerJobTitle() {
    return cy.get('a > .ant-card > * > .ant-card-meta-detail > .ant-card-meta-description')
  }

  openManagerOfCurrentProfile() {
    this.managerName().click()
    this.url().should('include', '/employees/test.manager@sidenis.com/')
  }

  //role tab
  tabSkills() {
    return cy.get('[role=tab]').contains('Skills')
  }

  tabBookmarks() {
    return cy.get('[role=tab]').contains('Bookmarks')
  }

  tabMatrices() {
    return cy.get('[role=tab]').contains('Matrices')
  }

  tabPersonalDevelopment() {
    return cy.get('[role=tab]').contains('Personal development')
  }

  tabSelfEvaluationForm() {
    return cy.get('[role=tab]').contains('Self Evaluation Form')
  }
}

export default Profile

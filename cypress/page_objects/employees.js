class Employees {
  url() {
    return cy.url()
  }

  visit() {
    cy.visit('/employees', { timeout: 20000 })
  }

  row() {
    return cy.get('[data-row-key]')
  }

  searchField() {
    return cy.get('input[placeholder="Find employee"]')
  }

  filterPosition() {
    return cy.get('th').eq(2).children(2).children(1).next()
  }

  filterLevel() {
    return cy.get('th').eq(3).children(2).children(1).next()
  }

  filterLocation() {
    return cy.get('th').eq(4).children(2).children(1).next()
  }

  selectPosition(name) {
    this.filterPosition().click()
    cy.get('span').contains(name).click()
    cy.contains('OK').click()
  }

  selectLevel(level) {
    this.filterLevel().click()
    cy.get('span').contains(level).click()
    cy.contains('OK').click()
  }

  selectLocation(location) {
    this.filterLocation().click()
    cy.get('span').contains(location).click()
    cy.contains('OK').click()
  }

  checkDisplayedRowsContainText(expectedText) {
    this.row().each($el => {
      let txt = $el.text()
      expect(txt).match(expectedText)
    })
  }

  //top-left block with employee data
  currentUserAvatar() {
    return cy.get('.ant-card-meta-avatar > .ant-avatar')
  }
}

export default Employees

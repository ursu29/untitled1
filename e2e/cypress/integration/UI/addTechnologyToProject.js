// import {
// } from '../../support/getData'
// import * as data from '../../support/getData'
// import { bodyData, bodyObj } from '../../support/emails/data'

describe('check updateTechnologiesProject', () => {

  let nameTechnology = 'People Skills';

  let newTechnology = '[title="People Skills"]';
  let editButton = '[data-icon="edit"]';
  let boxTechnologies = '.ant-select-selection-overflow';
  let saveEdit = '[data-icon="check"]';
  let technologies = '.ant-tag.sc-iRbamj.frdnPm';

  before(() => {
    cy.setToken('manager')

    cy.visit('https://portal.dev.syncretis.com/projects/guild-portal')
  })

  it('add new technology', () => {

    cy.get(editButton)
      .click()
    cy.get(boxTechnologies)
      .click()
    cy.get(newTechnology)
      .click()
    cy.get(saveEdit)
      .click()

    cy.get(technologies).should('contain.text', nameTechnology)
  })

  it('delete new technology', () => {

    cy.get(editButton)
      .click()
    cy.get(boxTechnologies)
      .click()
    cy.get(newTechnology)
      .click()
    cy.get(saveEdit)
      .click()

    cy.get(technologies).should('not.contain.text', nameTechnology)
  })
})
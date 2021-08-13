import {
} from '../../support/getData'
import { skillEl } from '../../support/locators'

describe('check updateTechnologiesProject', () => {

  let nameTechnology = 'People Skills';
  const displayTechnologies = skillEl.skillsEvent
  const headerTableSkills = skillEl.headerSkills

  let close = '[data-icon="close"]'
  let idSkillsButton = 'rc-tabs-0-tab-skills'

  before(() => {
    cy.setToken('manager')

    cy.visit('/projects/guild-portal')
  })

  it('add new technology', () => {

     cy.getIcon('edit')
       .click()
     cy.get(displayTechnologies)
       .click()
     cy.getTitle(nameTechnology)
       .click()
     cy.getIcon('check')
       .click()

    cy.getId(idSkillsButton).click()
    cy.get(headerTableSkills).should('contain.text', nameTechnology)
  })

  it('delete new technology', () => {

    cy.getIcon('edit')
      .click()
    cy.get(displayTechnologies)
      .contains(nameTechnology)
      .parent()
      .find(close)
      .click()
    cy.getIcon('check')
      .click()

    cy.get(headerTableSkills).should('not.contain.text', nameTechnology)
  })
})
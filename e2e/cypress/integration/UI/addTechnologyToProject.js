import {
} from '../../support/getData'
import { skillEl } from '../../support/locators'

describe('check updateTechnologiesProject', () => {

  let nameTechnology = 'People Skills';
  const {skillsEvent} = skillEl
  const {headerTableSkills} = skillEl

  let close = '[data-icon="close"]'
  let idSkillsButton = 'rc-tabs-0-tab-skills'

  before(() => {
    cy.setToken('manager')

    cy.visit('/projects/guild-portal')
  })

  it('add new technology', () => {

     cy.getIcon('edit')
       .click()
     cy.get(skillsEvent)
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
    cy.get(skillsEvent)
      .contains(nameTechnology)
      .parent()
      .find(close)
      .click()
    cy.getIcon('check')
      .click()

    cy.get(headerTableSkills).should('not.contain.text', nameTechnology)
  })
})
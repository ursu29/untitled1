// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { getSkill } from './complexLocators'
import { filterSkillsName } from './complexLocators'
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('getElement', name => cy.get(`[data-cy="${name}"]`))

Cypress.Commands.add('getId', name => cy.get(`[id="${name}"]`))

Cypress.Commands.add('getIcon', name => cy.get(`[data-icon="${name}"]`))

Cypress.Commands.add('clickElement', text => cy.get('span').contains(text).click())

Cypress.Commands.add('checkLength', (name, length) =>
  cy.getElement(name).its('length').should('eq', length),
)

Cypress.Commands.add('checkTextInArrayEl', (el, array, isDataAttr = true) => {
  const find = isDataAttr ? cy.getElement(el) : cy.get(el)

  find.each((val, idx) => {
    expect(val.text()).contains(array[idx])
  })
})

Cypress.Commands.add('isVisible', name => cy.getElement(name).should('be.visible'))

Cypress.Commands.add(
  'checkSkills',
  (visibleEl, attrNameShort, attrName, array, text = 'No skills yet') => {
    cy.document().then(doc => {
      if (doc.querySelectorAll(`[data-cy=${visibleEl}]`).length) {
        cy.getElement(visibleEl).should('have.text', text)

        return
      }
      cy.checkTextInArrayEl(getSkill(attrNameShort), filterSkillsName(attrName, array), false)
    })
  },
)

Cypress.Commands.add('selectFilterValue', (id, thText, name) => {
  cy.getElement(id).contains('th', thText).click('topRight')
  cy.clickElement(name)
  cy.contains('OK').click({ force: true })
})

Cypress.Commands.add('matchText', (el, text) => {
  cy.get(el).each(val => {
    const data = val.text()
    expect(data).match(text)
  })
})

Cypress.Commands.add('toEqualText', (el, text, isAttr = false, idx = 0) => {
  const element = isAttr ? cy.getElement(el).eq(idx) : cy.get(el)

  element.each(val => {
    const data = val.text()
    expect(data).to.equal(text)
  })
})

Cypress.Commands.add('haveText', (name, text) => cy.getElement(name).should('have.text', text))
Cypress.Commands.add('haveClass', (name, className) =>
  cy.getElement(name).should('have.class', className),
)

Cypress.Commands.add('openProfile', nameAndSurname => {
  cy.visit('/employees/' + nameAndSurname + '@syncretis.com/')
})

Cypress.Commands.add('compareObjectsKeys', (firstObj, secondObj) => {
  Object.keys(firstObj).filter(el => expect(Object.keys(secondObj)).includes(el))
})

Cypress.Commands.add('waitElDisappear', el => {
  cy.get(el).should('exist')
  cy.get(el).should('not.exist')
})

Cypress.Commands.add('checkImgToken', name => {
  if (!localStorage.getItem('img_token')) {
    cy.setImgToken(name)
  }
})

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})
Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

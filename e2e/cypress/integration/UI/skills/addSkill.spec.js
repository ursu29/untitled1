import {postEl, skillEl} from "../../../support/locators";

describe('add new skill', () => {
    const skillName = 'React dom'
    const description = 'The Document Object Model (DOM) is a programming interface for HTML and XML documents'
    const {titleTree} = skillEl
    let firstSkill

    before(() => {
        cy.setToken('employee')
        cy.visit('/skills')
        cy.get(titleTree).eq(0).then(el => firstSkill = el.text())
    })

    it('create new skill', () => {
        cy.get('span').contains('Add skill').click()
        cy.getId('skill_form_name').type(skillName)
        cy.getId('skill_form_description').type(description)
        cy.get(postEl.itemsSelect).eq(0).click()

        cy.getElement('submit').click()
        cy.getId('portal-select').type('react')

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')
    })
})
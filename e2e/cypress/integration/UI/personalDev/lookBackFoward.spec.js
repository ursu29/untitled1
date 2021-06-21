import {getTabUrl} from "../../../support/utils";
import {personalDevLocators, skillEl} from "../../../support/locators";

describe('check personal development items: look back/forward', () => {
    const { negative, positive, forward} = personalDevLocators
    const values = Object.values({negative, positive, forward})

    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit(getTabUrl('development-plan'))
    })

    it('successfully updated: Look Back/Forward', () => {
        values.forEach(el =>  {
            cy.getId(el).clear()
                .should('have.value', '')
                .type(el)
            cy.getElement('evaluation-form').click()

            cy.get(skillEl.successMes).should('have.text', 'Plan has been updated')
            cy.getId(el).should('have.value', el)
        })
        cy.reload()
        values.forEach(el => {
            cy.getId(el).should('have.value', el)
        })

    })
})
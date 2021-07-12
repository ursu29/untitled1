import {getTabUrl} from "../../../support/utils";
import {personalDevLocators, skillEl} from "../../../support/locators";
import {popUp} from "../../../support/client/employeeData";

describe('check achieve goal state', () => {
    const {achieveBtn, deleteGoals} = personalDevLocators
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit(getTabUrl('development-plan'))
    })

    after(() => {
        ;[1,2].forEach(_ => {
            cy.getIcon(deleteGoals).first().click({force: true})
            cy.get(popUp.button).contains('OK').click({force: true})

            cy.get(skillEl.successMes).should('have.text', 'Plan has been updated')
        })
    })

    it('successfully achieve goal', () => {
        cy.scrollTo(0, 400)
        ;[1,2].forEach(_  => {
            cy.getElement('addGoals').eq(0).click()
            cy.get(skillEl.successMes).should('have.text', 'Plan has been updated')
        })

        cy.getElement(achieveBtn).last().click({force: true})
        cy.get(skillEl.successMes).should('have.text', 'Plan has been updated')
        cy.getElement(achieveBtn).last().should('have.class', 'ant-switch-checked')
    })
})

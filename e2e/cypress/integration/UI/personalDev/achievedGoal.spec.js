import { getSubTabUrl } from '../../../support/utils'
import {personalDevLocators, skillEl} from "../../../support/locators";

describe('check achieve goal state', () => {
    const {achieveBtn} = personalDevLocators
    before(() => {
        cy.setToken('employee')

        cy.visit(getSubTabUrl('career', '/profile', 'development-plan'))
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

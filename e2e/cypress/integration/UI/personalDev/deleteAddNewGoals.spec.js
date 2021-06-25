import {getTabUrl} from "../../../support/utils";
import {personalDevLocators, skillEl} from "../../../support/locators";
import {popUp} from "../../../support/client/employeeData";

describe('delete and add new goals', () => {
    const {deleteGoals} = personalDevLocators
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit(getTabUrl('development-plan'))
    })

    it('successfully delete/add new goal', function () {
        cy.getIcon(deleteGoals).then(el => el.length).as('count')
        cy.scrollTo(0, 400)
        cy.getElement('addGoals').eq(0).click()
        cy.get(skillEl.successMes).should('have.text', 'Plan has been updated')
        cy.getIcon(deleteGoals).then(icon => {
            expect(icon.length).to.be.greaterThan(this.count)
        })

        cy.getIcon(deleteGoals).first().click({force: true})
        cy.get(popUp.button).contains('OK').click({force: true})

        cy.get(skillEl.successMes).should('have.text', 'Plan has been updated')
        cy.get(skillEl.successMes).should('not.exist')
    })
})

import {createTraining, deleteTraining} from "../../../support/getData";

import {matrix} from "../../../support/locators";
import {popUp} from "../../../support/client/employeeData";

describe('Complete the training (training)', () => {
    let createdId
    const text = new Date().getTime().toString()

    before(() => {
        cy.setToken('manager')
        cy.setImgToken('manager')

        cy.post(createTraining(text, text, null, true), 'superUser').then(res => {
            const { data } = res.body
            createdId = data.createOnboardingTicket.id
        })
    })

    after('delete training', () => {
        cy.post(deleteTraining(createdId), 'superUser').then(req => {
            const {deleteOnboardingTicket: {id}} = req.body.data

            expect(createdId).equal(id)
        })
    })

    it('training exist in My Training', () => {
        cy.visit('/onboarding')

        cy.addRole()

        ;['request', 'complete',].forEach(el => {
            if(el.includes('complete')) {
                cy.get('span').contains('Comp').click()

                return;
            }
            cy.getElement(el).eq(0).click()
            cy.get(popUp.button).contains('Yes').click()

            cy.get(matrix.success).should('be.visible')
            cy.get(matrix.success).should('not.exist')
        })

        cy.get('div').contains('Completed').click()

        cy.getElement('ticket').should('contain.text', text)
    })
})

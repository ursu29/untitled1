import {deleteTraining} from "../../../support/getData";
import {matrix} from "../../../support/locators";

describe('Create a new training (training)', () => {
    let createdId
    const text = new Date().getTime().toString()

    before(() => {
        cy.setToken('manager')
        cy.setImgToken('manager')

        cy.visit('/onboarding')

        cy.addRole()
    })

    after('delete post', () => {
        cy.post(deleteTraining(createdId), 'superUser').then(req => {
            const {deleteOnboardingTicket: {id}} = req.body.data

            expect(createdId).equal(id)
        })
    })

    it('training created successful', () => {
        cy.getElement('create').click()
        ;['basic_title', 'basic_description'].forEach(el => cy.getId(el).type(text))

        cy.getResponse(['createOnboardingTicket'], 'alias')
        ;['optional', 'saveTicket'].forEach(el => cy.getElement(el).click())

        cy.wait('@alias').then(req => {
            const {createOnboardingTicket: {id}} = req.response.body.data
            createdId = id
        })

        cy.get(matrix.success).should('be.visible')
        cy.get(matrix.success).should('not.exist')

        cy.getElement('ticket').should('contain.text', text)
    })
})

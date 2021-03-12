import * as getData from "../../../support/getData";

describe('check link "suggest a friend"', () => {
    let firstVacancie

    beforeEach(() => {
        cy.setToken('employee')
        cy.post(getData.getVacancies())
            .then(req => firstVacancie = req.body.data.vacancies[0])

        cy.visit('/vacancies')
    })

    it('correct href', () => {
        cy.getElement('suggestBtn')
            .eq(0)
            .should('have.attr', 'href')
            .then(href => {
                expect(href).contains(`subject=Suggest a candidate to ${firstVacancie.project.name}`)
            })
    })
})
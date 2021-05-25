import {skillEl} from "../../../support/locators";

describe('edit book', () => {
    const name  = `test name: ${new Date().getTime()}`

    before(()=> {
        cy.setToken('manager')
        cy.visit('/library')
    })

    it('successfully edit created book', () => {
        cy.getIcon('edit').eq(0).click()
        ;['title', 'author'].forEach( el => cy.getId(el).clear().type(name))

        cy.getResponse(['createBook'], 'alias')
        cy.getElement('submitBookModal').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.get('.ant-table-row-level-0').eq(0).then(el => expect(el.text()).contains(name))
    })
})
import {hrTool, skillEl} from "../../../support/locators";
import {removeBook} from "../../../support/getData";

const {postEl} = require("../../../support/locators");

describe('create new book', () => {
    let bookId
    const elements = ['title', 'author', 'portal-select']

    before(()=> {
        cy.setToken('manager')
        cy.visit('/library')
    })

    after(() => {
        cy.post(removeBook(bookId), 'superUser').then(req => {
            expect(bookId).equal(req.body.data.removeBook.id)
        })
    })

    it('successfully create new book', () => {
        ;['addBook', 'submitBookModal'].forEach(el => cy.getElement(el).click())

        cy.get(hrTool.errorMess).should('be.visible')

        elements.forEach( el => cy.getId(el).type('kozub'))
        cy.get(postEl.itemsSelect).first().click()

        cy.getResponse(['createBook'], 'alias')
        cy.getElement('submitBookModal').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.wait(`@alias`).then(req => bookId = req.response.body.data.createBook.id)

    })
})
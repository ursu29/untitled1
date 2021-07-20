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

    beforeEach(() => {
        cy.addHeadersAuth()
    })
    afterEach(() => {
        cy.addHeadersAuth()
    })

    after(() => {
        cy.post(removeBook(bookId), 'superUser').then(req => {
            expect(bookId).equal(req.body.data.removeBook.id)
        })
    })

    it('required fields are present', () => {
        ;['addBook', 'submitBookModal'].forEach(el => cy.getElement(el).click())

        cy.get(hrTool.errorMess).should('be.visible')
    })

    it('successfully create new book', () => {
        elements.forEach( el => cy.getId(el).type('kozub'))
        cy.get(postEl.itemsSelect).click()

        cy.getResponse(['createBook'], 'alias')
        cy.getElement('submitBookModal').click()

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.wait(`@alias`).then(req => bookId = req.response.body.data.createBook.id)

    })
})
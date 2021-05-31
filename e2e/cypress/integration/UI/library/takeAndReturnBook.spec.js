import {createBook, removeBook} from "../../../support/getData";
import {popUp} from "../../../support/client/employeeData";

const newBook = (author, title) => ({author, title})
describe('take return book', () => {
    let bookObj, bookId
    const author  = `author: ${new Date().getTime()}`
    const title  = `title: ${new Date().getTime()}`

    before(()=> {
        cy.setToken('manager')
        cy.post(createBook(newBook(author, title)), 'superUser').then(req => {
            const {createBook} = req.body.data

            bookId = createBook.id
            bookObj = createBook
        })
    })

    after(() => {
        cy.post(removeBook(bookId), 'superUser').then(req => {
            expect(bookId).equal(req.body.data.removeBook.id)
        })
    })

    it('successfully take/return a book', () => {takeButton
        cy.mockResponse(['getBooks'], {data: {books: [bookObj]}})
        cy.visit('/library')
        ;['Return', 'Take'].forEach(el => {
            cy.getElement('takeButton').click()
            cy.get(popUp.button).contains('Yes').click()
            cy.getElement('takeButton').should('have.text', el)
        })
    })
})
import { matrix, postEl } from '../../../support/locators'
import {pastDay, todaysDate} from "../../../support/officePlanner/officeDays";
import {createPost, deletePost} from "../../../support/getData";

describe('Update post', () => {
    let createdId

    before(() => {
        cy.setToken('manager')
        cy.post(createPost(pastDay, todaysDate), 'superUser').then(req => {
            const {createPost: {id}} = req.body.data
            createdId = id
        })

        cy.visit('/feed')
        cy.addRole()
    })

    after('delete post', () => {
        cy.post(deletePost(createdId), 'superUser').then(req => {
            const {deletePost: {id}} = req.body.data

            expect(createdId).equal(id)
        })
    })

    it('edit post, add title, body, tags', () => {
        const body = `${todaysDate} ${pastDay}`
        cy.get(postEl.posts).should('be.visible')
        cy.getIcon('edit').eq(0).click()
        cy.get(postEl.title).type(pastDay)
        cy.get(postEl.writePost).type(body)

        cy.scrollTo('bottom')

        cy.getElement('selectTag').last().click()
        cy.get(matrix.item).eq(0).click()
        cy.get(postEl.delete).should('be.visible')

        cy.getElement('preview').click()

        cy.getResponse(['createPost'], 'alias')
        cy.get('button').contains('Publish').click()

        cy.wait('@alias').then(req => {
            const {createPost: {id}} = req.response.body.data
            createdId = id
        })
        cy.get(matrix.success).should('be.visible')
        cy.get(matrix.success).should('not.exist')

        cy.get('.ant-typography').contains(pastDay).should('be.visible')
    })
})

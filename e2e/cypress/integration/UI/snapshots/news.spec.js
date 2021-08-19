import {getNews} from "../../../fixtures/getNews";

describe('Visual regression news page', () => {
    before(() => {
        cy.setToken('employee')

        cy.mockResponse(['getPosts'], getNews())
        cy.visit('/feed')
    })


    it(`Should match previous screenshot news Page`, () => {
        cy.get('.ant-tag-blue').should('be.visible')

        cy.snapshot('news', 'news')
    });
});
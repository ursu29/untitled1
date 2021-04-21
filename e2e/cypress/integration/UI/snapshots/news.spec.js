import {getNews} from "../../../fixtures/getNews";

describe('Visual regression news page', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.mockResponse(['getPosts'], getNews())
        cy.visit('/feed')

        cy.get('div').find('img').should('be.visible')
    })


    it(`Should match previous screenshot news Page`, () => {
        cy.get('.ant-tag-blue').eq(0).should('be.visible')

        cy.get('.ant-card-body').eq(1).matchImageSnapshot();
    });
});
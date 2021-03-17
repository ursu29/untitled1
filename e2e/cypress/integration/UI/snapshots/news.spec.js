import {getNews} from "../../../fixtures/getNews";

describe('Visual regression news page', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')


        cy.visit('/feed')
        cy.mockResponse(['getPosts'], getNews())
    })


    it(`Should match previous screenshot news Page`, () => {
        cy.get('.ant-tag-blue').eq(0).should('be.visible')

        cy.get('.ant-card-body').eq(1).matchImageSnapshot();
    });
});
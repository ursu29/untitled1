const {getGuilds} = require("../../../fixtures/guilds");

describe('Visual regression guilds page', () => {
    before(() => {
        cy.setToken('employee')
        cy.setImgToken('employee')

        cy.visit('/guilds')

        cy.mockResponse(['getGuilds'], getGuilds())
    })


    it(`Should match previous screenshot guilds Page`, () => {
        cy.getId('guildleaders').should('be.visible')

        cy.get('.ant-row').matchImageSnapshot();
    });
});
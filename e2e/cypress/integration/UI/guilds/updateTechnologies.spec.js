import {
    getGuildInfo,
    updateGuild,
} from "../../../support/getData";
import {skillEl} from "../../../support/locators";

describe('Update guilds Technologies', () => {
    let guildInfo
    const {iconEdit, select, successMes} = skillEl

    before(() => {
        cy.setToken('manager')
        cy.post(getGuildInfo()).then(res => {
            guildInfo = res.body.data.guild
            cy.post(updateGuild(guildInfo.azureDisplayName), 'superUser')
        })
        cy.visit('/guilds/community-frontend/')
        cy.addRole()
    })

    after('added all skills', () => {
        const {azureDisplayName} = guildInfo

        cy.post(updateGuild(azureDisplayName), 'superUser')
    })


    it('added new skill', () => {
        const title = 'Agile'

        cy.get(iconEdit).last().click()
        cy.get(select).click()
        cy.get('span').contains(title).click()

        cy.getIcon('check').click({force: true})

        cy.get(successMes).should('be.visible')
        cy.get(successMes).should('not.exist')

        cy.get('span').contains(title).should('be.visible')
    })
})

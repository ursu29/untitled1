import {
    getGuildInfo,
    updateGuildTitleAndLeaders
} from "../../../support/getData";
import {postEl, skillEl, guildElements} from "../../../support/locators";
import {todaysDate} from "../../../support/officePlanner/officeDays";

describe('Update guilds title and leads', () => {
    let guildInfo
    const {itemsSelect, edit, close} = postEl
    const {update, title, submit, employeeCard} = guildElements

    before(() => {
        cy.setToken('manager')
        cy.post(getGuildInfo()).then(res => {
            guildInfo = res.body.data.guild
            cy.post(updateGuildTitleAndLeaders(guildInfo.azureDisplayName, [], guildInfo.title), 'superUser')
        })
        cy.visit('/guilds/community-frontend/')
        cy.addRole()
    })

    after(() => {
        const {azureDisplayName, title} = guildInfo

        cy.post(updateGuildTitleAndLeaders(azureDisplayName, [], title), 'superUser')
    })


    it('change title and add leader to guild', () => {

        cy.get('span').contains(update).click()
        cy.getId(title).type(todaysDate)

        //select value
        cy.get('span').contains('employee').click()
        cy.get(itemsSelect).eq(0).click()
        cy.get(edit).click()

        cy.getElement(submit).click({force: true})

        cy.get(skillEl.successMes).should('be.visible')
        cy.get(skillEl.successMes).should('not.exist')

        cy.get(close).click()

        cy.getElement(employeeCard).should('be.visible')

    })
})

import {getGuildInfo, updateGuildDescription, updateGuildShortDescription} from "../../../support/getData";
import {todaysDate} from "../../../support/officePlanner/officeDays";

describe('Update guilds body text', () => {
    let guildInfo

    before(() => {
        cy.setToken('manager')
        cy.post(getGuildInfo()).then(res => guildInfo = res.body.data.guild)
    })

    after('added deleted technologies', () => {
        const {azureDisplayName, shortDescription, description} = guildInfo

        cy.post(updateGuildShortDescription(azureDisplayName, shortDescription), 'superUser')
        cy.post(updateGuildDescription(azureDisplayName, description), 'superUser')
    })


    it("As manager I can't change description", () => {
        const {azureDisplayName} = guildInfo

        cy.post(updateGuildShortDescription(azureDisplayName, todaysDate)).then(req => {
            const {message} = req.body.errors[0]
            expect(message).equal('You have got no access')
        })
    })

    it("Manager-superUser can update description", () => {
        const {azureDisplayName} = guildInfo

        cy.post(updateGuildShortDescription(azureDisplayName, todaysDate), 'superUser').then(req => {
            const {azureDisplayName} = req.body.data.updateGuild

            expect(azureDisplayName).equal(azureDisplayName)

            cy.post(getGuildInfo(azureDisplayName)).then(req => {
                const {shortDescription} = req.body.data.guild
                expect(shortDescription).equal(todaysDate)
            })
        })
    })


    it("Manager-superUser can update body", () => {
        const {azureDisplayName} = guildInfo

        cy.post(updateGuildDescription(azureDisplayName, todaysDate), 'superUser').then(req => {
            const {azureDisplayName} = req.body.data.updateGuild

            expect(azureDisplayName).equal(azureDisplayName)

            cy.post(getGuildInfo(azureDisplayName)).then(req => {
                const {description} = req.body.data.guild

                expect(description).equal(todaysDate)
            })
        })
    })
})

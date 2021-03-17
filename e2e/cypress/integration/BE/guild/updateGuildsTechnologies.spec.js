import {getGuildInfo, updateGuild} from "../../../support/getData";

describe('Update guilds Technologies', () => {
    let guildInfo

    before(() => {
        cy.setToken('manager')
        cy.post(getGuildInfo()).then(res => guildInfo = res.body.data.guild)
    })

    after('added deleted technologies', () => {
        const {azureDisplayName, skills} = guildInfo
        cy.post(updateGuild(azureDisplayName, skills.map(el => el.id)), 'superUser').then(_ => {
            cy.post(getGuildInfo()).then(res => {
                expect(res.body.data.guild.skills.length).equal(skills.length)
            })
        })
    })


    it("As manager I can't delete some Technologies skill", () => {
        const allSkills =  guildInfo.skills.map(el => el.id)
        const {azureDisplayName} = guildInfo

        cy.post(updateGuild(azureDisplayName, allSkills.slice(1))).then(req => {
            const {message} = req.body.errors[0]
            expect(message).equal('You have got no access')
        })
    })

    it("Manager-superUser can delete some Technologies skill", () => {
        const allSkills =  guildInfo.skills.map(el => el.id)
        const firstId = allSkills[0]
        const {azureDisplayName} = guildInfo

        cy.post(updateGuild(azureDisplayName, allSkills.slice(1)), 'superUser').then(req => {
            const {azureDisplayName} = req.body.data.updateGuild

            expect(azureDisplayName).equal(azureDisplayName)

            cy.post(getGuildInfo(azureDisplayName)).then(req => {
                const {skills} = req.body.data.guild
                expect(allSkills.length).to.be.greaterThan(skills.length)
                expect(skills).not.contains(firstId)
            })
        })
    })
})

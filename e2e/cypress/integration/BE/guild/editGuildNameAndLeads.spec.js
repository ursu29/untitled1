import {
    getEmployee,
    getGuildInfo,
    updateGuildTitleAndLeaders,
} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";
import {todaysDate} from "../../../support/officePlanner/officeDays";

describe('Change guild title and leads', () => {
    let guildInfo
    let managerId

    before(() => {
        cy.setToken('manager')
        cy.post(getEmployee(email('employee'))).then(res => {
            const {employeeByEmail} = res.body.data
            managerId = employeeByEmail.agileManager.id
        })
        cy.post(getGuildInfo()).then(res => guildInfo = res.body.data.guild)
    })

    after(() => {
        const {azureDisplayName, title} = guildInfo
        cy.post(updateGuildTitleAndLeaders(azureDisplayName, [], title), 'superUser')
    })

    it('update guilds title without access', () => {
        const {azureDisplayName} = guildInfo

        cy.post(updateGuildTitleAndLeaders(azureDisplayName, [managerId], todaysDate)).then(req => {
            const {message} = req.body.errors[0]

            expect(message).equal('You have got no access')
        })
    })

    it('update guilds title and leads', () => {
        const {azureDisplayName} = guildInfo

        cy.post(updateGuildTitleAndLeaders(azureDisplayName, [managerId], todaysDate), 'superUser').then(req => {
            const {azureDisplayName} = req.body.data.updateGuild

            expect(azureDisplayName).equal(azureDisplayName)

            cy.post(getGuildInfo(azureDisplayName)).then(req => {
                const {guild} = req.body.data

                expect(guild.title).equal(todaysDate)
                expect(guild.leaders.length).equal(1)
                expect(guild.leaders.map(el => el.id)[0]).equal(managerId)
            })
        })
    })
})

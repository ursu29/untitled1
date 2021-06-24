const {getScrumMasters} = require("../../../support/getData");
const {getTabUrl} = require("../../../support/utils");

describe('chek agile tab by location filter', () => {
    let allScrumMasters
    const cityName = 'TOMSK'

    before(() => {
        cy.setToken('manager')
        cy.setImgToken('manager')
        cy.visit(getTabUrl('scrum', 'management'))

        cy.post(getScrumMasters()).then(req => {
            const {projects} = req.body.data
            console.log(projects)

            allScrumMasters = projects.filter(el => el.scrumMasters.length)
        })
    })

    after(() => {
        cy.getIcon('filter').click()
        cy.get('.ant-checkbox-input').eq(2).click()
        cy.contains('OK').click({force: true})

        cy.get('.ant-table-row').then(el => expect(el.length).equal(allScrumMasters.length -1))
    })

    it('search by Location', () => {

        const  scrumMastersFromSaintP = allScrumMasters.filter(el => el.scrumMasters.some(el => el.location === cityName))
        console.log(scrumMastersFromSaintP)

        cy.getIcon('filter').click()
        cy.get('.ant-checkbox-input').eq(2).click()
        cy.contains('OK').click({force: true})

        cy.get('.ant-table-row').then(el => expect(el.length).equal(scrumMastersFromSaintP.length -1))
    })
});
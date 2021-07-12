import {hr, table} from "../../../support/locators";

const {getScrumMasters} = require("../../../support/getData");
const {getTabUrl} = require("../../../support/utils");
describe('chek agile tab by employees filter', () => {
    let allScrumMasters

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
        cy.getIcon(hr.inputSearch).eq(0).click({force: true})
        cy.getElement('reset').click()

        cy.get('.ant-table-row').then(el => expect(el.length).equal(allScrumMasters.length -1))
    })

    it('search by Employees', () => {
        const {name} = allScrumMasters[0].scrumMasters[0]

        cy.get('.ant-table-row').then(el => expect(el.length).equal(allScrumMasters.length -1))

        cy.getIcon(hr.inputSearch).eq(0).click()
        cy.getElement(table.inputSearch).type(name)
        cy.getElement(table.searchBtn).click({ force: true })

        cy.get('.ant-table-row').eq(0).then(el => expect(el.text()).contains(name))
    })
});
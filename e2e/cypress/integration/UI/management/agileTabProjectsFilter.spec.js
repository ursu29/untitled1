import {hr, table} from "../../../support/locators";

const {getScrumMasters} = require("../../../support/getData");
const {getTabUrl} = require("../../../support/utils");

describe('chek agile table by project filter', () => {
    let allScrumMasters

    before(() => {
        cy.setToken('manager')
        cy.visit(getTabUrl('scrum', 'management'))

        cy.post(getScrumMasters()).then(req => {
            const {projects} = req.body.data

            allScrumMasters = projects.filter(el => el.scrumMasters.length)
        })
    })

    after(() => {
        cy.getIcon(hr.inputSearch).eq(1).click({force: true})
        cy.getElement('reset').click()

        cy.get('.ant-table-row').then(el => expect(el.length).equal(allScrumMasters.length -1))
    })

    it('search by Project', () => {
        const {name} = allScrumMasters[0]

        cy.getIcon(hr.inputSearch).eq(1).click()
        cy.getElement(table.inputSearch).type(name)
        cy.getElement(table.searchBtn).click({ force: true })

        cy.get('.ant-table-row').eq(0).then(el => expect(el.text()).contains(name))

    })
});
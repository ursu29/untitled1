import {getProcessMock} from "../../../fixtures/openProcesses";
import {getTabUrl} from "../../../support/utils";
import {caretDown} from "../../../support/locators";
import {tableTr} from "../../../support/locators";

describe('open process looks good', () => {
    const processName = 'Onboarding SwissRe'
    const cityName = 'Saint Petersburg'
    const positionName = 'Java Developer'

    before(() => {
        cy.setToken('manager')
        cy.mockResponse(['processExecutions'], getProcessMock())
        cy.visit(getTabUrl('inactive', 'hr'))
    })

    it('filters work well ', () => {

        cy.getIcon(caretDown.caretDownButton).eq(1).click({force: true})
        cy.get(tableTr.tableString).eq(0).should('contain.text', 'offBoarding')
        cy.get(tableTr.tableString).eq(8).should('contain.text', 'Onboarding SwissRe')

        cy.getIcon(caretDown.caretDownButton).eq(2).click({force: true})
        cy.get(tableTr.tableString).eq(0).should('contain.text', 'Riskmarket')
        cy.get(tableTr.tableString).eq(8).should('contain.text', 'Timemaster')

        cy.getIcon(caretDown.caretDownButton).eq(3).click({force: true})
        cy.get(tableTr.tableString).eq(0).should('contain.text', 'Kaliningrad')
        cy.get(tableTr.tableString).eq(8).should('contain.text', 'Zürich')

        cy.getIcon(caretDown.caretDownButton).eq(4).click({force: true})
        cy.get(tableTr.tableString).eq(8).should('contain.text', 'Manual QA Engineer')
        cy.get(tableTr.tableString).eq(2).should('contain.text', 'Frontend Developer')

        cy.getIcon(caretDown.caretDownButton).eq(5).click({force: true})
        cy.get(tableTr.tableString).eq(0).should('contain.text', 'Arina Busygina')
        cy.get(tableTr.tableString).eq(5).should('contain.text', 'Test Employee')

        cy.getIcon(caretDown.caretDownButton).eq(6).click({force: true})
        cy.get(tableTr.tableString).eq(0).should('contain.text', '05.12.1900')
        cy.get(tableTr.tableString).eq(5).should('contain.text', '05.05.2021')


        cy.getIcon('search').first().click()
        cy.getElement('search').type(processName)
        cy.getElement('btnSearch').first().click()
        cy.get(tableTr.tableString).its('length').should('be.equal', 8)

        cy.getIcon('filter').first().click()
        cy.get('.ant-checkbox-input').first().click()
        cy.contains('OK').click({force: true})
        cy.get(tableTr.tableString).its('length').should('be.equal', 7)


        cy.getIcon('filter').last().click()
        cy.get('span').contains(cityName).click({force: true})
        cy.contains('OK').click({force: true})
        cy.get(tableTr.tableString).its('length').should('be.equal', 6)

        cy.getIcon('search').eq(1).click({force: true})
        cy.getElement('search').eq(1).type(positionName)
        cy.getElement('btnSearch').eq(1).click({force: true})
        cy.get(tableTr.tableString).its('length').should('be.equal', 5)
    })
})

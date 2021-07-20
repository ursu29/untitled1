import {employeeAccess} from "../../../support/locators";

describe('check employee access', () => {
        before(() => {
            cy.setToken('employee')

            cy.visit(employeeAccess.employeeUrl)
        })

        it('should show only Skills, Bookmarks', () => {
            cy.get('.ant-tabs-nav').last().matchImageSnapshot('noAccessBookmarks')
        })
})

import {employeeAccess} from "../../../support/locators";

describe('check manager access', () => {
    before(() => {
        cy.setToken('manager')

        cy.visit(employeeAccess.employeeUrl)
        cy.addRole()
    })

    it('should show al bookmarks menu', () => {
        cy.get('.ant-tabs-nav').last().matchImageSnapshot('allBookmarks')
    })
})
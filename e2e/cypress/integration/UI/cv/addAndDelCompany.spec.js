import {getCV} from '../../../support/getData'
import { getSubTabUrl } from '../../../support/utils'

describe('successfully create and delete new Company', () => {
    before(() => {

        cy.setToken('employee')
        cy.visit(getSubTabUrl('career', '/profile', 'cv'))

    })

    it('Company created and deleted successful', () => {

        cy.get('.ant-col.ant-col-sm-16 [type="button"]').click()
        cy.get('.ant-select-selection-search input[id="cv-company-name-_company"]').type('New Company')
        cy.get('.anticon.anticon-check').click()
        cy.get('.sc-kEYyzF.egAstc').should('exist')

        cy.get('[style=""] > .sc-hMqMXs > .ant-btn').click()
        cy.get('.ant-popover-buttons > .ant-btn-primary').click()
        cy.get('.sc-kEYyzF.egAstc').should('not.exist')
    })

})


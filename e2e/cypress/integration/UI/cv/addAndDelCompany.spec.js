import { getSubTabUrl } from '../../../support/utils'

describe('successfully create and delete new Company', () => {

    const companyName = 'New Company'

   before(() => {
        cy.setToken('employee')
        cy.visit(getSubTabUrl('career', '/profile', 'cv'))
    })

    it('Company created and deleted successful', () => {

        cy.getElement('addCompany').click()
        cy.getId('cv-company-name-_company').type(companyName)
        cy.getId('cv-company-name-').getType('submit').click()
        cy.getElement('workExperienceBlock').contains(companyName).should('exist')

        cy.getElement('deleteCompany').click()
        cy.get('button').contains('OK').click()
        cy.getElement('workExperienceBlock').contains(companyName).should('not.exist')
    })
})


import { getSubTabUrl } from '../../../support/utils'
import {workExperienceElement} from "../../../support/locators";

describe('successfully create and delete new Company', () => {

    const companyName = 'New Company'

   before(() => {
        cy.setToken('employee')
        cy.visit(getSubTabUrl('career', '/profile', 'cv'))
    })

    it('Company created and deleted successful', () => {

        cy.getElement('addCompany').click()
        cy.getElement('inputCompanyName').type(companyName)
        cy.getElement('saveNewCompany').getType('submit').click()
        cy.getElement(workExperienceElement.companyTitle).contains(companyName).should('exist')

        cy.getElement('deleteCompany').click()
        cy.get('button').contains('OK').click()
        cy.getElement(workExperienceElement.companyTitle).contains(companyName).should('not.exist')
    })
})


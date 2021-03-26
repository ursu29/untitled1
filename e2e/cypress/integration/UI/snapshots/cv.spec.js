import { getCv } from '../../../fixtures/cv'
import {getEmployee} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";

describe('cv table looks good', () => {
  let id

  before(() => {
    cy.setToken('employee')
    cy.setImgToken('employee')

    cy.post(getEmployee(email('employee')))
        .then(res => id = res.body.data.employeeByEmail.id)
  })

  it('check all matrix', () => {
    cy.visit('/profile/cv')
    cy.mockResponse(['getEmployeeCV'], getCv(id))

    cy.get('.ant-skeleton').should('be.visible')
    cy.get('.ant-skeleton').should('not.exist')
    cy.getElement('cvForm').matchImageSnapshot('cv')
  })
})

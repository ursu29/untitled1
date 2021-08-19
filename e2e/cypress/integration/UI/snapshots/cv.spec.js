import { getCv } from '../../../fixtures/cv'
import {getEmployee} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";
import { getSubTabUrl } from '../../../support/utils'

describe('cv table looks good', () => {
  let id
  const elements = ['workExperience', 'cvCertificates', 'cvEducation']

  before(() => {
    cy.setToken('manager')

    cy.post(getEmployee(email('employee')))
        .then(res => id = res.body.data.employeeByEmail.id)
  })

  it('check all matrix', () => {
    cy.visit(getSubTabUrl('career', '/profile', 'cv'))

    cy.mockResponse(['getCV'], getCv(id))
    elements.forEach(el => cy.snapshot(el, el))
  })
})

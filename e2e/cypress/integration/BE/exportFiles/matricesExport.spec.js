import {
  exportUrl,
  getEmployee, getEmployeeExperiences,
} from '../../../support/getData'
import { email } from '../../../support/client/employeeData'

const experiencesObj = experiencesData => ({
  experiences: [...experiencesData],
    matrices: [],
})

describe('export Matrices file', () => {
  let experiencesData

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee')))
      .then(res => {
        const { id } = res.body.data.employeeByEmail

        cy.post(getEmployeeExperiences(id)).then(req => {
          experiencesData = req.body.data.employees[0].experiences
        })
      })
  })

  it('successfully get the file', () => {
    cy.post(
      experiencesObj(experiencesData),
      'superUser',
      exportUrl('export')).then(res => {
      expect(res.status).equal(200)
      expect(res.body.length).to.be.greaterThan(0)
    })
  })
})


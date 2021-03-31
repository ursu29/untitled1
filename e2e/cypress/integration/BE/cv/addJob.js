import {email} from '../../../support/client/employeeData'
import {getCV, getEmployee, updateCV} from '../../../support/getData'

const obj = {
  company: "",
  dateEnd: null,
  dateStart: null,
  level: "",
  position: "",
  project: "",
  responsibilities: ""
}
describe('add new work experience (cv)', () => {
  let employeeData
  let jobs

  before(() => {
    cy.setToken('employee')

    cy.post(getEmployee(email('employee'))).then(res => {
      employeeData = res.body.data.employeeByEmail

      cy.post(getCV(employeeData.email))
          .then(val => jobs = val.body.data.employeeByEmail.curriculumVitae)
    })
  })

  it('successfully creating a new job place', () => {
    const request = {
      employee: employeeData.id,
      id: jobs.id,
      vitaes: [obj]
    }

    cy.post(updateCV(request)).then(res => {
      const {id, vitaes} = res.body.data.updateCurriculumVitae

      expect(id).equal(jobs.id)
      expect(vitaes.length).equal(1)
    })
  })
})

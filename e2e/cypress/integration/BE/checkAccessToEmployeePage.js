import {
  getAllEmployees, getEmployeeDetailed,
  getEmployeesParametеrs,
  updateEmployeeCapacity,
} from '../../support/getData'
import { email } from '../../support/client/employeeData'

describe('Check access to employee page', () => {

  let employeeID, agileManagerID
  const employeeEmail = 'a.vygodchikov@syncretis.com'


  before(() => {
    cy.setToken('employee')

    cy.post(getEmployeeDetailed(employeeEmail)).then(res => {
      const { employeeByEmail } = res.body.data

      employeeID = employeeByEmail.id
     })

    cy.post(getEmployeeDetailed(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data

      agileManagerID = employeeByEmail.id
    })
  })

  it('employee access to parameters of another employee', () => {

    cy.post(getEmployeesParametеrs({
      input: { id: employeeID },
      inputEmail: { employeeEmail: employeeEmail },
      inputToWhom: { toWhom: employeeID }
    })).then(res => {

      const {curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess} = res.body.data
      ;[curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess].forEach(el => {

        expect(el.write).equals(false)
        expect(el.read).equals(false)
      })
    })
  })

  it('manager access to parameters of employee', () => {

    cy.post(updateEmployeeCapacity(employeeID, agileManagerID, []))
    cy.post(getEmployeeDetailed(employeeEmail))

    cy.post(getEmployeesParametеrs({
        input: { id: employeeID },
        inputEmail: { employeeEmail: employeeEmail },
        inputToWhom: { toWhom: employeeID }
    })).then(res => {

        const {curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess} = res.body.data
        ;[curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess].forEach(el => {

          expect(el.write).equals(true)
          expect(el.read).equals(true)
        })
      })
  })

  after(() => {

    cy.post(updateEmployeeCapacity(employeeID, null, []))
    cy.post(getEmployeeDetailed(employeeEmail)).then(res => {
      const { agileManager } = res.body.data.employeeByEmail

      expect(agileManager).equals(null)
    })
  })
})



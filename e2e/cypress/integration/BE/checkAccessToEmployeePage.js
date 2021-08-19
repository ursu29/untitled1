import {
  getAllEmployees, getEmployeeDetailed,
  getEmployeesParametеrs,
  updateEmployeeCapacity,
} from '../../support/getData'

describe('Check access to employee page', () => {

  let employeeID, employeeEmail
  let agileManagerID = '603f592a7ae138001c21f6bc'

  before(() => {
    cy.setToken('employee')

    cy.post(getAllEmployees()).then(res => {
      const employeeAll = res.body.data.employees

      employeeID = employeeAll[0].id
      employeeEmail = employeeAll[0].email
    })
  })

  it('employee access to parameters of another employee', () => {

    cy.post(getEmployeesParametеrs({
      input: { id: employeeID },
      inputEmail: { employeeEmail: employeeEmail },
      inputToWhom: { toWhom: employeeID }
    })).then(res => {
      const employeeData = res.body.data

      const {curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess} = employeeData
      debugger
      [curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess].forEach(el => {

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
        const employeeData = res.body.data

        const {curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess} = employeeData
        debugger
          [curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess].forEach(el => {

            expect(el.write).equals(true)
            expect(el.read).equals(true)
        })
      })
  })

  after(() => {

    cy.post(updateEmployeeCapacity(employeeID, null, []))
    cy.post(getEmployeeDetailed(employeeEmail))

  })
})



import {
  getAllEmployees, getEmployeeDetailed,
  getEmployeesParametеrs,
  updateEmployeeCapacity,
} from '../../support/getData'

describe('Check access to employee page', () => {

  let employeeID, employeeEmail
  let curriculumVitaeAccess, developmentPlanLookReviewersAccess, matricesLookReviewersAccess, evaluationReviewersAccess
  let cRead, cWrite, mRead, mWrite, dRead, dWrite, eRead, eWrite
  let agileManagerID = '603f592a7ae138001c21f6bc'

  before(() => {
    cy.setToken('employee')

    cy.post(getAllEmployees()).then(res => {
      const employeeAll = res.body.data.employees

      employeeID = employeeAll[217].id
      employeeEmail = employeeAll[217].email
    })
  })

  it('employee access to parameters of another employee', () => {

    cy.post(getEmployeesParametеrs({
      input: { id: employeeID },
      inputEmail: { employeeEmail: employeeEmail },
      inputToWhom: { toWhom: employeeID }
    })).then(res => {
      const employeeData = res.body.data

      curriculumVitaeAccess = employeeData.curriculumVitaeAccess
      cRead = curriculumVitaeAccess.read
      cWrite = curriculumVitaeAccess.write

      developmentPlanLookReviewersAccess = employeeData.developmentPlanLookReviewersAccess
      dRead = developmentPlanLookReviewersAccess.read
      dWrite = developmentPlanLookReviewersAccess.write

      matricesLookReviewersAccess = employeeData.matricesLookReviewersAccess
      mRead = matricesLookReviewersAccess.read
      mWrite = matricesLookReviewersAccess.write

      evaluationReviewersAccess = employeeData.evaluationReviewersAccess
      eRead = evaluationReviewersAccess.read
      eWrite = evaluationReviewersAccess.write

      let parameters =
        {cRead, cWrite,
        mRead, mWrite,
        dRead, dWrite,
        eRead, eWrite}

       Object.keys(parameters).forEach(key => {
         expect(parameters[key]).equals(false)
         })
    })
  })

    it('manager access to parameters of employee', () => {

      cy.post(updateEmployeeCapacity(employeeID, agileManagerID, [])).then(res => {
        const addAgileManager = res.body
      })
      cy.post(getEmployeeDetailed(employeeEmail)).then(res => {
        const checkAgileManager = res.body.data.employeeByEmail.agileManager
      })

      cy.post(getEmployeesParametеrs({
        input: { id: employeeID },
        inputEmail: { employeeEmail: employeeEmail },
        inputToWhom: { toWhom: employeeID }
      })).then(res => {
        const employeeData = res.body.data

        curriculumVitaeAccess = employeeData.curriculumVitaeAccess
        cRead = curriculumVitaeAccess.read
        cWrite = curriculumVitaeAccess.write

        developmentPlanLookReviewersAccess = employeeData.developmentPlanLookReviewersAccess
        dRead = developmentPlanLookReviewersAccess.read
        dWrite = developmentPlanLookReviewersAccess.write

        matricesLookReviewersAccess = employeeData.matricesLookReviewersAccess
        mRead = matricesLookReviewersAccess.read
        mWrite = matricesLookReviewersAccess.write

        evaluationReviewersAccess = employeeData.evaluationReviewersAccess
        eRead = evaluationReviewersAccess.read
        eWrite = evaluationReviewersAccess.write

        let parameters =
          {
            cRead, cWrite,
            mRead, mWrite,
            dRead, dWrite,
            eRead, eWrite
          }

        Object.keys(parameters).forEach(key => {
          expect(parameters[key]).equals(true)
        })
      })
    })

  after(() => {

    cy.post(updateEmployeeCapacity(employeeID, null, [])).then(res => {
      const deleteAgileManager = res.body
    })
    cy.post(getEmployeeDetailed(employeeEmail)).then(res => {
      const checkAgileManager = res.body.data.employeeByEmail
    })
  })
})



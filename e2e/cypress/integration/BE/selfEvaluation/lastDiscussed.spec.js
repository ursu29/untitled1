import {
  customFieldsMutationSelfEv,
  evaluationCustomFields,
  getEmployee
} from "../../../support/getData";
import {email} from "../../../support/client/employeeData";
import {todaysDate} from "../../../support/officePlanner/officeDays";

describe('update last discussed Self Evaluation Form', () => {
  let employee
  let evaluationData

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee')))
        .then(res => {
          employee = res.body.data.employeeByEmail

          cy.post(customFieldsMutationSelfEv(employee.id, todaysDate))
              .then(res => expect(res.status).equal(200))
        })
  })

  beforeEach(() => {
    cy.post(evaluationCustomFields(employee.id)).then(req => {
      evaluationData = req.body.data.evaluationCustomFields
    })
  })

  it('update personal dev date', () => {
    cy.post(customFieldsMutationSelfEv(employee.id, todaysDate))
        .then(res => expect(res.status).equal(200))
  })

  it('check evaluation employeeMail', () => {
    expect(evaluationData.employeeMail).equal(employee.email)
  })

  it('check evaluation id', () => {
    expect(evaluationData.id).equal(employee.id)
  })

  it('check evaluation lastDiscussed', () => {
    expect(evaluationData.lastDiscussed).equal(todaysDate)
  })
})

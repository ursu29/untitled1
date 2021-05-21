import {
  exportUrl,
  getEmployee, getEvaluations,
} from '../../../support/getData'
import { email } from '../../../support/client/employeeData'

const selfEvaluationObj = evaluationData => ({
  evaluationAttributes: [...evaluationData],
  evaluations: [],
  employee: {},
  reviewers: [],
  comments: [],
})

describe('export selfEvaluation file', () => {
  let evaluationData

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee')))
      .then(res => {
        const { id } = res.body.data.employeeByEmail

        cy.post(getEvaluations(id)).then(req => {
          evaluationData = req.body.data.evaluations
        })
      })
  })

  it('successfully get the file', () => {
    cy.post(
      selfEvaluationObj(evaluationData),
      'superUser',
      exportUrl('export-evaluations')).then(res => {
      expect(res.status).equal(200)
      expect(res.body.length).to.be.greaterThan(0)
    })
  })
})


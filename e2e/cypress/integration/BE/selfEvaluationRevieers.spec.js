import {email} from '../../support/client/employeeData'
import {createEvaluationReviewer, deleteReviewer, getEmployee, getEvaluationReviewers} from "../../support/getData";

describe('Check getEvaluationRevieers', () => {
  let employeeId
  let managerId
  const errorMessage = 'You have no access'

  before(() => {
    cy.setToken('manager')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { employeeByEmail } = res.body.data
      employeeId = employeeByEmail.id
      managerId = employeeByEmail.agileManager.id
    })
  })

    it('add reviewer', () => {
      cy.post(createEvaluationReviewer(employeeId, managerId), 'superUser')
    })

    it('delete reviewers if employee has not access', () => {
      cy.post(getEvaluationReviewers(employeeId)).then(req => {
        const firstReviewer = req.body.data.evaluationReviewers[0]

        cy.post(deleteReviewer(firstReviewer.fromWho.id, firstReviewer.toWhom.id)).then(req => {
          const {message} = req.body.errors[0]

          expect(message).equal(errorMessage)
        })
      })
    })

    it('delete reviewers if employee has access', () => {
      cy.post(getEvaluationReviewers(employeeId)).then(req => {
        const firstReviewer = req.body.data.evaluationReviewers[0]

        cy.post(deleteReviewer(firstReviewer.fromWho.id, firstReviewer.toWhom.id), 'superUser').then(req => {
          const {deleteEvaluationReviewer} = req.body.data

          expect(deleteEvaluationReviewer.__typename).equal('EvaluationReviewer')
        })
      })
    })
  })

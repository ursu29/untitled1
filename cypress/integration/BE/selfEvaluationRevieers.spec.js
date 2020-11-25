import { employeeData } from '../../support/client/employeeData'
import {
  toWhomData,
  fromWhoReviewers,
  evaluationReviewersData,
} from '../../support/client/selfEvaluation'

describe('Check getEvaluationRevieers', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getEvaluationRevieers'], 'alias')
    cy.visit('/client/profile/evaluation')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('Attributes response', () => {
    const { id } = employeeData.employee
    const { evaluationReviewers } = response
    const firstAttribute = evaluationReviewers[0]
    const { toWhom, fromWho } = firstAttribute

    expect(evaluationReviewers).to.be.a('array')
    cy.compareObjectsKeys(firstAttribute, evaluationReviewersData)
    expect(firstAttribute.__typename).equal(evaluationReviewersData.__typename)
    cy.compareObjectsKeys(toWhom, toWhomData(id))
    cy.compareObjectsKeys(fromWho, fromWhoReviewers)
    expect(fromWho.isMe).to.be.a('boolean')
  })
})

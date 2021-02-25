import { employeeData } from '../../support/client/employeeData'
import {
  toWhomData,
  fromWhoReviewers,
  evaluationReviewersData,
} from '../../support/client/selfEvaluation'
import { checkTwoString } from '../../support/utils'
import { query } from '../../fixtures/query'

describe('Check getEvaluationRevieers', () => {
  let response
  let request
  const OPERATION_NAME = 'getEvaluationRevieers'

  before(() => {
    cy.setToken('employee')
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit('/profile/evaluation')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
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

  it('check request body', () => {
    checkTwoString(query.getEvaluationRevieers, request.query)
    expect(request.operationName).equal(OPERATION_NAME)
  })
})

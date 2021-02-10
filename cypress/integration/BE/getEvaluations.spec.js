import {
  fromWhoData,
  toWhomData,
  evaluationAttributeData,
  evaluation,
} from '../../support/client/selfEvaluation'
import { employeeData } from '../../support/client/employeeData'
import {checkTwoString} from "../../support/utils";
import {query} from "../../fixtures/query";

describe('Check getEvaluations response', () => {
  let response
  let request
  const OPERATION_NAME = 'getEvaluations'

  before(() => {
    cy.setToken('employee')
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit('/profile/evaluation')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('check request body', () => {
    checkTwoString(query.getEvaluations, request.query)
    expect(request.operationName).equal(OPERATION_NAME)
  })

  it('getEvaluations response', () => {
    const { evaluationComments, evaluations } = response
    const firstEvaluation = evaluations[0]

    expect(evaluationComments).to.be.a('array')
    expect(evaluations).to.be.a('array')
    cy.compareObjectsKeys(firstEvaluation, evaluation)
    expect(firstEvaluation.__typename).equal(evaluation.__typename)
  })

  it('Check evaluationAttribute', () => {
    const { evaluationAttribute } = response.evaluations[0]

    cy.compareObjectsKeys(evaluationAttribute, evaluationAttributeData)
    expect(evaluationAttribute.__typename).equal(evaluationAttributeData.__typename)
  })

  it('Check fromWho', () => {
    const { fromWho } = response.evaluations[0]

    cy.compareObjectsKeys(fromWho, fromWhoData)
    expect(fromWho.__typename).equal(fromWhoData.__typename)
  })

  it('Check toWhom', () => {
    const { toWhom } = response.evaluations[0]
    const { id, __typename } = employeeData.employee

    cy.compareObjectsKeys(toWhom, toWhomData(id))
    expect(toWhom.__typename).equal(__typename)
    expect(toWhom.id).equal(id)
  })
})

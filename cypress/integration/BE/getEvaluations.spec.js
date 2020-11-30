import {
  fromWhoData,
  toWhomData,
  evaluationAttributeData,
  evaluation,
} from '../../support/client/selfEvaluation'
import { employeeData } from '../../support/client/employeeData'

describe('Check getEvaluations response', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getEvaluations'], 'alias')
    cy.visit('/client/profile/evaluation')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
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

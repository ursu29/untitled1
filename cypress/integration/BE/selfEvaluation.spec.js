import { employeeData } from '../../support/client/employeeData'
import {
  evaluation,
  evaluationAttributeData,
  fromWhoData,
  evaluationAttributesData,
  archivedSEFVersion,
  evaluationReviewersData,
  fromWhoReviewers,
  toWhomData,
} from '../../support/client/selfEvaluation'

describe(`Check employee Self Evaluation Form`, () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getEvaluations'], 'alias')
    cy.visit('/client/profile/evaluation')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
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

describe('Check archivedSEFVersions', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['archivedSEFVersions'], 'alias')
    cy.visit('/client/profile/evaluation')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('getEvaluations response', () => {
    const { archivedSEFVersions } = response
    const firstArchived = archivedSEFVersions[0]

    expect(archivedSEFVersions).to.be.a('array')
    cy.compareObjectsKeys(firstArchived, archivedSEFVersion)
    expect(firstArchived.__typename).equal(archivedSEFVersion.__typename)
  })
})

describe('Check Attributes', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['evaluationAttributes', 'id', 'title'], 'alias')
    cy.visit('/client/profile/evaluation')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('Attributes response', () => {
    const { evaluationAttributes } = response
    const firstAttribute = evaluationAttributes[0]

    expect(evaluationAttributes).to.be.a('array')
    cy.compareObjectsKeys(firstAttribute, evaluationAttributesData)
    expect(firstAttribute.__typename).equal(evaluationAttributesData.__typename)
  })
})

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

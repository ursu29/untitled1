import {
  fromWhoData,
  toWhomData,
  evaluationAttributeData,
  evaluation,
} from '../../support/client/selfEvaluation'
import {email} from '../../support/client/employeeData'
import {checkTwoString, getTabUrl} from '../../support/utils'
import { query } from '../../fixtures/query'
import {evaluate, getEmployee, getEvaluations} from "../../support/getData";

describe('Check getEvaluations response', () => {
  let response
  let request
  let employeeData
  const OPERATION_NAME = 'getEvaluations'

  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {

      const { employeeByEmail } = res.body.data
      employeeData = employeeByEmail

      cy.post(getEvaluations(employeeByEmail.id)).then(req => {
        const {evaluations} = req.body.data

        cy.post(evaluate(employeeByEmail.id, 'some comment', evaluations[0].evaluationAttribute.id))
            .then(res => expect(res.status).equal(200))
      })
    })
    cy.getResponse([OPERATION_NAME], 'alias')
    cy.visit(getTabUrl('evaluation'))
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
    const { id, __typename } = employeeData

    cy.compareObjectsKeys(toWhom, toWhomData(id))
    expect(toWhom.__typename).equal(__typename)
    expect(toWhom.id).equal(id)
  })
})

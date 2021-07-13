import {
  fromWhoData,
  toWhomData,
  evaluationAttributeData,
  evaluation,
} from '../../support/client/selfEvaluation'
import {email} from '../../support/client/employeeData'
import { checkTwoString, getSubTabUrl } from '../../support/utils'
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
    cy.visit(getSubTabUrl('career', '/profile', 'evaluation'))
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      request = val.request.body
    })
  })

  it('getEvaluations response', () => {
    checkTwoString(query.getEvaluations, request.query)
    expect(request.operationName).equal(OPERATION_NAME)

    const { evaluationComments, evaluations } = response
    const { evaluationAttribute, fromWho } = evaluations[0]
    const { id, __typename } = employeeData

    cy.compareObjectsKeys(evaluations[0], evaluation)
    cy.compareObjectsKeys(evaluationAttribute, evaluationAttributeData)
    cy.compareObjectsKeys(fromWho, fromWhoData)
    cy.compareObjectsKeys(toWhom, toWhomData(id))

    expect(toWhom.__typename).equal(__typename)
    expect(toWhom.id).equal(id)
    expect(fromWho.__typename).equal(fromWhoData.__typename)
    expect(evaluationComments).to.be.a('array')
    expect(evaluations).to.be.a('array')
    expect(evaluations[0].__typename).equal(evaluation.__typename)
    expect(evaluationAttribute.__typename).equal(evaluationAttributeData.__typename)
  })
})

import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeCV, curriculumVitaeData, vitaeData } from '../../support/client/cv'
import { addJob, deleteJob, getCV } from '../../support/getData'
import { checkTwoString } from '../../support/utils'
import { query } from '../../fixtures/query'

describe('Check CV', () => {
  let response
  let request
  let jobId = ''

  before(() => {
    cy.setToken('employee')

    cy.post(getCV()).then(val => {
      const {curriculumVitae: {id}} = val.body.data.employeeByEmail
      jobId = id
      cy.post(addJob(employeeData.employee.id, jobId))
    })
    cy.getResponse(['getEmployeeCV'], 'alias')
    cy.visit('/profile/cv')

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
    checkTwoString(query.getEmployeeCV, request.query)
    expect(request.operationName).equal('getEmployeeCV')
  })

  it('getEmployeeCV response', () => {
    const { id, __typename } = employeeData.employee
    const { employeeByEmail } = response

    cy.compareObjectsKeys(employeeByEmail, employeeCV)
    checkKeyValueExist(employeeByEmail, { id, __typename })
  })

  it('curriculumVitae response', () => {
    const { __typename } = curriculumVitaeData
    const { curriculumVitae } = response.employeeByEmail

    cy.compareObjectsKeys(curriculumVitae, curriculumVitaeData)
    checkKeyValueExist(curriculumVitae, { __typename })
  })

  it('vitaes response', () => {
    const { __typename } = vitaeData
    const { curriculumVitae } = response.employeeByEmail
    const firstData = curriculumVitae.vitaes[0]

    cy.compareObjectsKeys(firstData, vitaeData)
    checkKeyValueExist(firstData, { __typename })
  })

  it('delete job', () => {
    const { vitaes } = response.employeeByEmail.curriculumVitae

    cy.post(deleteJob(jobId, employeeData.employee.id)).then(res => {
      const { __typename, id } = res.body.data.updateCurriculumVitae

      expect(id).to.equal(jobId)
      expect(__typename).equal('CurriculumVitae')
    })
    cy.post(getCV()).then(val => {
      const { curriculumVitae } = val.body.data.employeeByEmail

      expect(vitaes.length).to.be.greaterThan(curriculumVitae.vitaes.length)
    })
  })

  it('create job - check request', () => {
    cy.getElement('addJob').click()

    cy.intercept('POST', '/graphql').as('new-job')
    cy.wait('@new-job').then(el => {
      const { body } = el.request
      const {
        operationName,
        variables: { input },
      } = body

      expect(operationName).equal('updateCurriculumVitae')
      expect(input.employee).equal(employeeData.employee.id)
      expect(input.id).equal(jobId)
    })
    cy.post(deleteJob(jobId, employeeData.employee.id))
  })
})

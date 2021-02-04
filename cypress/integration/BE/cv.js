import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeCV, curriculumVitaeData, vitaeData } from '../../support/client/cv'
import {addJob, deleteJob, getCV} from "../../support/getData";

describe('Check CV', () => {
  let response
  const {email} = employeeData.employee
  const employeeId = '60098d16a8239b001ce8bcec'

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getEmployeeCV'], 'alias')

    cy.post(addJob(email, employeeId))
    cy.visit('/profile/cv')
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
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
    const {vitaes} = response.employeeByEmail.curriculumVitae

    cy.post(deleteJob(email, employeeId)).then(res => {
      const { __typename, id } = res.body.data.updateCurriculumVitae

      expect(id).to.equal(employeeId)
      expect( __typename).equal('CurriculumVitae')
    })
    cy.post(getCV()).then(val => {
      const {curriculumVitae} = val.body.data.employeeByEmail

      expect(vitaes.length).to.be.greaterThan(curriculumVitae.vitaes.length)
    })
  })

  it('create job - check request', () => {
    cy.getElement('addJob').click()

    cy.intercept('POST', '/graphql').as('new-job')
    cy.wait('@new-job').then(el => {
      const {body} = el.request
      const {operationName, variables: {input}} = body

      expect(operationName).equal('updateCurriculumVitae')
      expect(input.employeeEmail).equal(email)
      expect(input.id).equal(employeeId)
    })
    cy.post(deleteJob(email, employeeId))
  })
})

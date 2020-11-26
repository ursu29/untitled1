import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeCV, curriculumVitaeData, vitaeData, project } from '../../support/client/cv'

describe('Check CV', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getEmployeeCV'], 'alias')
    cy.visit('/client/profile/cv')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
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
})

describe('Check CV project', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['projects', 'description'], 'alias')
    cy.visit('/client/profile/cv')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('project response', () => {
    const { __typename } = project
    const { projects } = response
    const firstProject = projects[0]

    cy.compareObjectsKeys(firstProject, project)
    checkKeyValueExist(firstProject, { __typename })
  })
})

import { employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'
import { employeeCV, curriculumVitaeData, vitaeData } from '../../support/client/cv'
import {addJob} from "../../support/getData";

describe('Check CV', () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getEmployeeCV'], 'alias')
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

  it('add new job', () => {
    cy.post(addJob()).then(res => {
      const { ____typename } = res.body.data
      expect(____typename).toEqual('CurriculumVitae')
    })
  })
})

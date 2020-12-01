import {
  getProject,
  getEmployeeData,
  matricesAccess,
  employeeData,
  level,
} from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'

describe(`Check employee getEmployee`, () => {
  let response

  beforeEach(() => {
    cy.setToken('employee')
  })

  it('getEmployee response', () => {
    const { id, __typename } = employeeData.employee
    cy.getResponse(['getEmployee', 'activeProcessExecutions'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', getEmployeeData(id, __typename), [id, __typename])
  })

  it('getEmployeeEmail response', () => {
    cy.getResponse(['getEmployee', 'phoneNumber'], 'alias')
    cy.visit('/client/profile')
    cy.wait(`@alias`).then(val => {
      response = val.response.body.data
      const { agileManager } = employeeData.employee

      cy.compareObjectsKeys(response.employeeByEmail, employeeData.employee)
      checkKeyValueExist(response.employeeByEmail.agileManager, agileManager)
    })
  })

  it('GetEmployeeProjects response', () => {
    const { id, __typename } = employeeData.employee

    cy.getResponse(['GetEmployeeProjects'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', getProject(id, __typename))
  })

  it('GetEmployeeProjects response', () => {
    cy.getResponse(['levels'], 'alias')
    cy.visit('/client/profile')

    cy.wait('@alias').then(req => {
      const response = req.response.body
      const firstLevel = response.data.levels[0]

      expect(response.data.levels).to.be.a('array')
      Object.keys(firstLevel).filter(el => expect(Object.keys(level)).includes(el))
    })
  })

  it('matricesAccess response', () => {
    cy.getResponse(['matricesAccess'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', matricesAccess)
  })
})

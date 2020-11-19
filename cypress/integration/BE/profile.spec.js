import {
  getProject,
  getEmployeeData,
  matricesAccess,
  employeeData,
  level,
} from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'

describe(`Check employee getEmployee`, () => {
  before(() => {
    cy.setToken('employee')
  })

  it('getEmployee response', () => {
    const { id, __typename } = employeeData.employee
    cy.getResponse(['getEmployee', 'activeProcessExecutions'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', getEmployeeData(id, __typename), [id, __typename])
  })
})
describe(`Check employee geEmployeeAllData`, () => {
  let response

  before(() => {
    cy.setToken('employee')
    cy.getResponse(['getEmployee', 'phoneNumber', 'isMe'], 'alias')
    cy.visit('/client/profile')
    cy.wait(`@alias`).then(val => (response = JSON.parse(val.response.body).data))
  })

  it('getEmployee response', () => {
    checkKeyValueExist(response.employeeByEmail, employeeData.employee)
  })
})

describe(`Check employee GetEmployeeProjects`, () => {
  before(() => {
    cy.setToken('employee')
  })

  it('GetEmployeeProjects response', () => {
    const { id, __typename } = employeeData.employee

    cy.getResponse(['GetEmployeeProjects'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', getProject(id, __typename))
  })
})

describe(`Check employee Levels`, () => {
  before(() => {
    cy.setToken('employee')
  })

  it('GetEmployeeProjects response', () => {
    cy.getResponse(['levels'], 'alias')
    cy.visit('/client/profile')

    cy.wait('@alias').then(req => {
      const response = JSON.parse(req.response.body)
      const firstLevel = response.data.levels[0]

      expect(response.data.levels).to.be.a('array')
      Object.keys(firstLevel).filter(el => expect(Object.keys(level)).includes(el))
    })
  })
})

describe(`Check employee matricesAccess`, () => {
  before(() => {
    cy.setToken('employee')
  })

  it('matricesAccess response', () => {
    cy.getResponse(['matricesAccess'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', matricesAccess)
  })
})

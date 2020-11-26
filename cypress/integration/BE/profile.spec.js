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

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
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
    cy.wait(`@alias`).then(val => (response = val.response.body.data))
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('getEmployeeEmail response', () => {
    const { agileManager } = employeeData.employee

    cy.compareObjectsKeys(response.employeeByEmail, employeeData.employee)
    checkKeyValueExist(response.employeeByEmail.agileManager, agileManager)
  })
})

describe(`Check employee GetEmployeeProjects`, () => {
  before(() => {
    cy.setToken('employee')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
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

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
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
})

describe(`Check employee matricesAccess`, () => {
  before(() => {
    cy.setToken('employee')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('matricesAccess response', () => {
    cy.getResponse(['matricesAccess'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', matricesAccess)
  })
})

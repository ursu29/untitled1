import {
  employeeAccess,
  experience,
  getProject,
  getAllEmployeeData,
  getEmployeeData,
  email,
  matricesAccess,
  employeeData,
  level,
} from '../../support/employeeData'
import { getEmployee } from '../../support/getData'

describe(`Check employee getEmployee`, () => {
  before(() => {
    cy.setToken('employee')
    cy.post(getEmployee(email('employee'))).then(res => {
      const { data } = res.body

      employeeData.employee = { ...data.employeeByEmail }
    })
  })

  it('getEmployee response', () => {
    const { id, __typename } = employeeData.employee
    cy.getResponse(['getEmployee', 'activeProcessExecutions'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', getEmployeeData(id, __typename))
  })
})
describe(`Check employee geEmployeeAllData`, () => {
  before(() => {
    cy.setToken('employee')
  })

  it('getEmployee response', () => {
    const { __typename } = employeeData.employee
    //filter requests
    cy.getResponse(['getEmployee', 'phoneNumber', 'isMe'], 'alias')
    cy.visit('/client/profile')

    cy.compareTwoJson('alias', getAllEmployeeData(__typename))
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

describe(`Check employee getEmployeeExperiences`, () => {
  before(() => {
    cy.setToken('employee')
  })

  it('getEmployeeExperiences response', () => {
    const { id, name } = employeeData.employee

    cy.getResponse(['getEmployeeExperiences'], 'alias')
    cy.visit('/client/profile')

    cy.wait('@alias').then(req => {
      const response = JSON.parse(req.response.body)
      const employee = response.data.employees[0]

      expect(response.data.employees).to.be.a('array')
      expect(employee.id).to.equal(id)
      expect(employee.name).to.equal(name)

      expect(employee.access).to.deep.equal(employeeAccess)
      Object.keys(employee.experiences[0]).filter(el =>
        expect(Object.keys(experience)).includes(el),
      )
    })
  })
})

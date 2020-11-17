import {
  employeeAccess,
  experience,
  getProject,
  getAllEmployeeData,
  employeeData,
  getEmployeeData,
} from '../../support/employeeData'

describe('Check profile getEmployee', () => {
  before(() => {
    cy.setToken('employee')
    cy.visit('/client/profile')
  })

  it('getEmployee response', () => {
    cy.getResponse(['getEmployee', 'activeProcessExecutions'], 'elias')
    cy.visit('/client/profile')

    cy.compereTwoJson('elias', getEmployeeData(employeeData.id, employeeData.__typename))
  })
})

describe('Check Profile geEmployeeAllData', () => {
  before(() => {
    cy.setToken('employee')
    cy.visit('/client/profile')
  })

  it('getEmployee response', () => {
    cy.getResponse(['getEmployee', 'phoneNumber', 'isMe'], 'elias')
    cy.visit('/client/profile')

    cy.compereTwoJson('elias', getAllEmployeeData(employeeData.__typename))
  })
})

describe('Check GetEmployeeProjects', () => {
  before(() => {
    cy.setToken('employee')
    cy.visit('/client/profile')
  })

  it('GetEmployeeProjects response', () => {
    cy.getResponse(['GetEmployeeProjects'], 'elias')
    cy.visit('/client/profile')

    cy.compereTwoJson('elias', getProject(employeeData.id, employeeData.__typename))
  })
})

describe('Check getEmployeeExperiences', () => {
  before(() => {
    cy.setToken('employee')
    cy.visit('/client/profile')
  })

  it.only('getEmployeeExperiences response', () => {
    cy.getResponse(['getEmployeeExperiences'], 'elias')
    cy.visit('/client/profile')

    cy.wait('@elias').then(req => {
      const response = JSON.parse(req.response.body)
      const employee = response.data.employees[0]

      expect(response.data.employees).to.be.a('array')
      expect(employee.id).to.equal(employeeData.id)
      expect(employee.name).to.equal(employeeData.name)

      expect(employee.access).to.deep.equal(employeeAccess)
      Object.keys(employee.experiences[0]).filter(el =>
        expect(Object.keys(experience)).includes(el),
      )
    })
  })
})

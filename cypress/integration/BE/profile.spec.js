import { matricesAccess, employeeData } from '../../support/client/employeeData'
import { checkKeyValueExist } from '../../support/complexLocators'

describe(`Check employee getEmployee`, () => {
  const {
    bonuses,
    country,
    email,
    id,
    isMe,
    location,
    name,
    phoneNumber,
    position,
    status,
    __typename,
  } = employeeData.employee

  before(() => {
    cy.setToken('employee')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  context('Check matricesAccess', () => {
    it('matricesAccess response', () => {
      cy.getResponse(['matricesAccess'], 'alias')
      cy.visit('/profile')

      cy.compareTwoJson('alias', matricesAccess)
    })
  })

  context('Check getEmployee response', () => {
    it('getEmployee response', () => {
      cy.getResponse(['getEmployee', 'agileManager'], 'alias')
      cy.visit('/profile')

      cy.wait('@alias').then(req => {
        const { data } = req.response.body

        checkKeyValueExist(data.employeeByEmail, {
          bonuses,
          country,
          email,
          id,
          isMe,
          location,
          name,
          phoneNumber,
          position,
          status,
          __typename,
        })
      })
    })
  })

  context('Check GetEmployeeProjects request', () => {
    it('GetEmployeeProjects response', () => {
      const { id, __typename } = employeeData.employee

      cy.getResponse(['GetEmployeeProjects'], 'alias')
      cy.visit('/profile')

      cy.wait('@alias').then(req => {
        const { data } = req.response.body
        const firstEmployee = data.employees[0]

        expect(firstEmployee.leadingProjects).to.be.a('array')
        expect(firstEmployee.projects).to.be.a('array')
        checkKeyValueExist(firstEmployee, { id, __typename })
      })
    })
  })
})

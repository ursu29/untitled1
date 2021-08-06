import {getClient, getManager, getProjects, getEmployeeExperiences, getEmployee} from '../../support/getData'
import {email} from '../../support/client/employeeData'

describe('Checking default information', () => {
  let employeeData
  let allData = {
    client: null,
    manager: null,
    projects: null,
    levels: null,
  }

  before(() => {
    cy.setToken('manager')

    cy.visit('/')
    cy.post(getEmployee(email('employee'))).then(res => {
      employeeData = res.body.data.employeeByEmail

      cy.post(getClient()).then(res => {
        const { data } = res.body
        allData = { ...allData, client: data }
      })
      cy.post(getManager(employeeData.id)).then(res => {
        const { data } = res.body
        allData = { ...allData, manager: data }
      })
      cy.post(getProjects(employeeData.id)).then(res => {
        const { data } = res.body
        allData = { ...allData, projects: data }
      })
      cy.post(getEmployeeExperiences(employeeData.id)).then(res => {
        const { data } = res.body
        allData = { ...allData, levels: data }
      })
    })
  })

  beforeEach(() => {
    cy.addHeadersAuth()
  })
  afterEach(() => {
    cy.addHeadersAuth()
  })

  it('Check Employee data', () => {
    const { profile } = allData.client

    cy.haveText('employee_name', profile.name)
    cy.haveText('position', profile.position)
    cy.haveText('location', 'Saint Petersburg')
    cy.haveText('email', profile.email)
    cy.checkIfElementPresent('phone', profile.phoneNumber)
    cy.getElement('avatar').should('be.visible')

    cy.visit(`/employees/${employeeData.email}?subtab=matrices`)
    cy.getElement('matrix-tabs').should('be.visible')
  })
})

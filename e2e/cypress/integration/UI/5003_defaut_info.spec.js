import {email} from '../../support/client/employeeData'
import {getClient, getEmployee, getEmployeeExperiences, getProjects} from "../../support/getData";

describe('Checking default information (e2e)', () => {
  let userId
  let allData = {
    client: null,
    manager: null,
    projects: null,
    levels: null,
  }

  before(() => {
    cy.setToken('employee')
    cy.visit('/')
    cy.post(getClient()).then(res => {
      const { data } = res.body
      allData = { ...allData, client: data }
    })
    cy.post(getEmployee(email('manager'))).then(res => {
      const { data } = res.body
      userId = data.employeeByEmail.id
      allData = { ...allData, manager: data }

      cy.post(getProjects(userId)).then(res => {
        const { data } = res.body
        allData = { ...allData, projects: data }
      })
      cy.post(getEmployeeExperiences(userId)).then(res => {
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
    profile.bonuses ? cy.getElement('bonuses').should('contain.text', profile.bonuses) : null
  })

  it('Information about employee manager', () => {
    const { employeeByEmail } = allData.manager

    cy.get('.ant-card-meta-title').contains('Manager').should('have.text', employeeByEmail.name)
    cy.get('.ant-card-meta-description')
      .contains('Agile')
      .should('have.text', employeeByEmail.position)
    cy.getElement('avatar').should('be.visible')
  })
})

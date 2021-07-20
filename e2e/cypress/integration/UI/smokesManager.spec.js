import {getClient, getManager, getProjects, getEmployeeExperiences, getEmployee} from '../../support/getData'
import { tabs, workspace } from '../../support/locators'
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
    cy.getElement('bonuses').should('contain.text', '50000 ₽')
    cy.get('.ant-card-meta-description').contains('Agile').should('have.text', 'Agile Manager')
    cy.getElement('avatar').should('be.visible')
  })

  it('Check the Teams and Outlook buttons', () => {
    cy.getElement('mail_button').should('be.visible')
    cy.getElement('teams_button').should('be.visible')
  })

  it('Check all tabs', () => {
    Object.values(tabs).forEach(val => cy.get(workspace.tab).contains(val))
  })

  it('Manager can see employee private tabs', () => {
    cy.visit(`/employees/${employeeData.email}`)
    ;[tabs.matrices, tabs.personal, tabs.cv, tabs.form].forEach(el =>
      cy.get(workspace.tab).contains(el).should('be.visible'),
    )
  })
})
